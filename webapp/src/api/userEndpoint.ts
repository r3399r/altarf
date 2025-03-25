import { GetUserResponse } from 'src/model/backend/api/User';
import http from 'src/api/http';

const getUser = async () => {
  return await http.authGet<GetUserResponse>('user');
};

export default {
  getUser,
};
