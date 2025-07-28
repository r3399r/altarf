import http from 'src/api/http';
import {
  GetUserResponse,
  GetUserTransactionParams,
  GetUserTransactionResponse,
} from 'src/model/backend/api/User';
import { axiosError, defaultErrorMessage } from 'src/utils/errorHandler';

const getUser = async () => {
  try {
    return await http.authGet<GetUserResponse>('user');
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

const getUserTransaction = async (params: GetUserTransactionParams) => {
  try {
    return await http.authGet<GetUserTransactionResponse, GetUserTransactionParams>(
      'user/transaction',
      {
        params,
      },
    );
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

export default {
  getUser,
  getUserTransaction,
};
