import http from 'src/api/http';
import {
  GetECPayItemsResponse,
  GetECPayPaymentParams,
  GetECPayPaymentResponse,
} from 'src/model/backend/api/ECPay';
import { axiosError, defaultErrorMessage } from 'src/utils/errorHandler';

const getEcpayPayment = async (params: GetECPayPaymentParams) => {
  try {
    return await http.authGet<GetECPayPaymentResponse>('ecpay/payment', { params });
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

const getEcpayItems = async () => {
  try {
    return await http.get<GetECPayItemsResponse>('ecpay/items');
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

export default {
  getEcpayPayment,
  getEcpayItems,
};
