import http from 'src/api/http';
import {
  GetUserResponse,
  GetUserTransactionParams,
  GetUserTransactionResponse,
} from 'src/model/backend/api/User';

const getUser = async () => await http.authGet<GetUserResponse>('user');

const getUserTransaction = async (params: GetUserTransactionParams) =>
  await http.authGet<GetUserTransactionResponse, GetUserTransactionParams>('user/transaction', {
    params,
  });

export default {
  getUser,
  getUserTransaction,
};
