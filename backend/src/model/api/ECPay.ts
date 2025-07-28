import { ECPayTradeItem } from 'src/model/entity/ECPayTradeItemEntity';

export type GetECPayPaymentParams = {
  ecpayTradeItemId: string;
  returnUrl: string;
};

export type GetECPayPaymentResponse = {
  MerchantID: string;
  MerchantTradeNo: string;
  MerchantTradeDate: string;
  PaymentType: string;
  TotalAmount: string;
  TradeDesc: string;
  ItemName: string;
  ReturnURL: string;
  ChoosePayment: string;
  EncryptType: string;
  CheckMacValue: string;
};

export type GetECPayItemsResponse = ECPayTradeItem[];
