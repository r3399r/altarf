export type GetECPayPaymentParams = {
  totalAmount: string;
  tradeDesc: string;
  itemName: string;
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
