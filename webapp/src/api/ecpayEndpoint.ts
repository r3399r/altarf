import http from 'src/api/http';
import { GetECPayPaymentParams, GetECPayPaymentResponse } from 'src/model/backend/api/ECPay';

const getEcpayPayment = async (params: GetECPayPaymentParams) =>
  await http.authGet<GetECPayPaymentResponse>('ecpay/payment', { params });

export default {
  getEcpayPayment,
};
