import http from 'src/api/http';
import { PostAuthRequest, PostAuthResponse } from 'src/model/backend/api/Auth';
import { axiosError, defaultErrorMessage } from 'src/utils/errorHandler';

const postAuth = async (data: PostAuthRequest) => {
  try {
    return await http.post<PostAuthResponse>('auth', { data });
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

export default {
  postAuth,
};
