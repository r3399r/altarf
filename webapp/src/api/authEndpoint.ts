import http from 'src/api/http';
import { PostAuthRequest, PostAuthResponse } from 'src/model/backend/api/Auth';

const postAuth = async (data: PostAuthRequest) =>
  await http.post<PostAuthResponse>('auth', { data });

export default {
  postAuth,
};
