import crypto from 'crypto';
import { format } from 'date-fns';
import { inject, injectable } from 'inversify';
import { ECPayTradeAccess } from 'src/access/ECPayTradeAccess';
import { ECPayTradeItemAccess } from 'src/access/ECPayTradeItemAccess';
import { UserAccess } from 'src/access/UserAccess';
import { UserBalanceAccess } from 'src/access/UserBalanceAccess';
import {
  GetECPayPaymentParams,
  GetECPayPaymentResponse,
} from 'src/model/api/ECPay';
import { BalanceTransactionType } from 'src/model/constant/Balance';
import { ECPayTradeStatus } from 'src/model/constant/ECPay';
import { ECPayOrderResult } from 'src/model/ECPay';
import { ECPayTradeEntity } from 'src/model/entity/ECPayTradeEntity';
import { UserBalanceEntity } from 'src/model/entity/UserBalanceEntity';
import { UserService } from './UserService';

@injectable()
export class ECPayService {
  @inject(UserService)
  private readonly userService!: UserService;

  @inject(UserBalanceAccess)
  private readonly userBalanceAccess!: UserBalanceAccess;

  @inject(ECPayTradeItemAccess)
  private readonly ecpayTradeItemAccess!: ECPayTradeItemAccess;

  @inject(ECPayTradeAccess)
  private readonly ecpayTradeAccess!: ECPayTradeAccess;

  @inject(UserAccess)
  private readonly userAccess!: UserAccess;

  private async getUserInfo() {
    return await this.userService.getUserEntity();
  }

  private genMacValue(params: { [key: string]: string }) {
    const sortedKeys = ['HashKey', ...Object.keys(params).sort(), 'HashIV'];
    const allParams = {
      HashKey: process.env.ECPAY_HASH_KEY ?? '',
      ...params,
      HashIV: process.env.ECPAY_HASH_IV ?? '',
    };

    const dataString = sortedKeys
      .map((key) => `${key}=${allParams[key as keyof typeof allParams]}`)
      .join('&');
    const encodedDataString = encodeURIComponent(dataString)
      .replace(/%20/g, '+')
      .toLowerCase();

    return crypto
      .createHash('sha256')
      .update(encodedDataString)
      .digest('hex')
      .toUpperCase();
  }

  public async createPayment(
    params: GetECPayPaymentParams
  ): Promise<GetECPayPaymentResponse> {
    const user = await this.getUserInfo();
    const ecpayTradeItem = await this.ecpayTradeItemAccess.findOneByIdOrFail(
      params.ecpayTradeItemId
    );

    const tradeNo = 'CS' + Date.now().toString();
    const tradeDate = new Date().toISOString();

    const ecpayTradeEntity = new ECPayTradeEntity();
    ecpayTradeEntity.userId = user.id;
    ecpayTradeEntity.tradeNo = tradeNo;
    ecpayTradeEntity.tradeDate = tradeDate;
    ecpayTradeEntity.ecpayTradeItemId = ecpayTradeItem.id;
    ecpayTradeEntity.status = ECPayTradeStatus.CREATED;
    const newEcpayTradeEntity =
      await this.ecpayTradeAccess.save(ecpayTradeEntity);

    const ecpayParams = {
      MerchantID: process.env.ECPAY_MERCHANT_ID ?? '',
      MerchantTradeNo: tradeNo,
      MerchantTradeDate: format(new Date(tradeDate), 'yyyy/MM/dd HH:mm:ss'),
      PaymentType: 'aio',
      TotalAmount: ecpayTradeItem.price,
      TradeDesc: ecpayTradeItem.description,
      ItemName: ecpayTradeItem.name,
      ReturnURL: params.returnUrl,
      ChoosePayment: 'ALL',
      EncryptType: '1',
      CustomField1: newEcpayTradeEntity.id,
    };

    return {
      ...ecpayParams,
      CheckMacValue: this.genMacValue(ecpayParams),
    };
  }

  public async handleNotify(params: string) {
    const urlParams = new URLSearchParams(params);
    const result = Object.fromEntries(urlParams.entries()) as ECPayOrderResult;
    console.log(result);
    const { CheckMacValue, ...restParams } = result;

    if (CheckMacValue !== this.genMacValue(restParams)) {
      console.error('Invalid CheckMacValue');

      return;
    }

    const ecpayTradeEntity = await this.ecpayTradeAccess.findOneByIdOrFail(
      result.CustomField1
    );
    const ecpayTradeItem = ecpayTradeEntity.ecpayTradeItem;
    const user = ecpayTradeEntity.user;

    ecpayTradeEntity.tradeAmount = result.TradeAmt;
    ecpayTradeEntity.paymentDate = result.PaymentDate;
    ecpayTradeEntity.paymentType = result.PaymentType;
    ecpayTradeEntity.paymentTypeChargeFee = result.PaymentTypeChargeFee;
    ecpayTradeEntity.returnCode = result.RtnCode;
    ecpayTradeEntity.returnMessage = result.RtnMsg;
    ecpayTradeEntity.status =
      result.RtnCode === '1' ? ECPayTradeStatus.PAID : ECPayTradeStatus.FAILED;
    await this.ecpayTradeAccess.save(ecpayTradeEntity);

    if (result.RtnCode === '1') {
      user.balance += Number(ecpayTradeItem.amount);
      await this.userAccess.save(user);

      const userBalanceEntity = new UserBalanceEntity();
      userBalanceEntity.userId = user.id;
      userBalanceEntity.transactionType = BalanceTransactionType.DEPOSIT;
      userBalanceEntity.amount = Number(ecpayTradeItem.amount);
      userBalanceEntity.balance = user.balance;
      userBalanceEntity.description = 'ECPay';
      userBalanceEntity.transactedAt = new Date(
        result.PaymentDate
      ).toISOString();
      await this.userBalanceAccess.save(userBalanceEntity);
    }
  }
}
