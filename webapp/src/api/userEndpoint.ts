import http from 'src/api/http';
import { GetUserResponse } from 'src/model/backend/api/User';

const getUser = async () => await http.authGet<GetUserResponse>('user');

export default {
  getUser,
};
