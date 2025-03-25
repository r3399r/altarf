import { PostAuthRequest, PostAuthResponse } from 'src/model/backend/api/Auth';
import http from 'src/api/http';

const postAuth = async (data: PostAuthRequest) => {
  return await http.post<PostAuthResponse>('auth', { data });
};

export default {
  postAuth,
};
