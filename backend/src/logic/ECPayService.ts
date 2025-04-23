import crypto from 'crypto';
import { format } from 'date-fns';
import { injectable } from 'inversify';
import {
  GetECPayPaymentParams,
  GetECPayPaymentResponse,
} from 'src/model/api/ECPay';

@injectable()
export class ECPayService {
  public async createPayment(
    params: GetECPayPaymentParams
  ): Promise<GetECPayPaymentResponse> {
    const tradeNo = 'cs' + Date.now().toString();
    const tradeDate = format(Date.now(), 'yyyy/MM/dd HH:mm:ss');

    const ecpayParams = {
      MerchantID: process.env.ECPAY_MERCHANT_ID ?? '',
      MerchantTradeNo: tradeNo,
      MerchantTradeDate: tradeDate,
      PaymentType: 'aio',
      TotalAmount: params.totalAmount,
      TradeDesc: params.tradeDesc,
      ItemName: params.itemName,
      ReturnURL: params.returnUrl,
      ChoosePayment: 'ALL',
      EncryptType: '1',
    };

    const sortedKeys = [
      'HashKey',
      ...Object.keys(ecpayParams).sort(),
      'HashIV',
    ];
    const allParams = {
      HashKey: process.env.ECPAY_HASH_KEY ?? '',
      ...ecpayParams,
      HashIV: process.env.ECPAY_HASH_IV ?? '',
    };

    const dataString = sortedKeys
      .map((key) => `${key}=${allParams[key as keyof typeof allParams]}`)
      .join('&');
    const encodedDataString = encodeURIComponent(dataString)
      .replace(/%20/g, '+')
      .toLowerCase();
    const hash = crypto
      .createHash('sha256')
      .update(encodedDataString)
      .digest('hex')
      .toUpperCase();

    return {
      ...ecpayParams,
      CheckMacValue: hash,
    };
  }

  public async handleNotify(params: string) {
    const urlParams = new URLSearchParams(params);
    const result = Object.fromEntries(urlParams.entries());
    console.log(result);
  }
}
