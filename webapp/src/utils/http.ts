import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import packageJson from '../../package.json';
import { PostAuthRefreshRequest, PostAuthRefreshResponse } from 'src/model/backend/api/Auth';
import { decrypt, encrypt } from './crypto';
import { dispatch } from 'src/redux/store';
import { setIsLogin } from 'src/redux/uiSlice';

// eslint-disable-next-line
type Options<D = any, P = any> = {
  headers?: RawAxiosRequestHeaders;
  data?: D;
  params?: P;
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api/',
  timeout: 30000,
};

const defaultHeader: RawAxiosRequestHeaders = {
  'Content-type': 'application/json',
  Accept: 'application/json',
  'x-api-version': packageJson.version,
};

// eslint-disable-next-line
const publicRequestConfig = <D = unknown, P = any>(
  method: string,
  url: string,
  options?: Options<D, P>,
) => ({
  ...defaultConfig,
  headers: {
    ...defaultHeader,
    ...options?.headers,
  },
  data: options?.data,
  params: options?.params,
  url,
  method,
});

const authEndpointRefreshToken = async (data: PostAuthRefreshRequest) => {
  const res = await post<PostAuthRefreshResponse, PostAuthRefreshRequest>('auth/refresh', { data });
  return res.data;
};

const checkAccessTokenAvailable = (accessToken: string) => {
  const expiredAt = sessionStorage.getItem('expiredAt');

  if (accessToken.length === 0 || !expiredAt || new Date() > new Date(expiredAt)) {
    return false;
  }
  return true;
};

const getNewAccessTokenByRefreshToken = async () => {
  try {
    const encryptedRefreshToken = localStorage.getItem('refreshToken');
    if (!encryptedRefreshToken) {
      throw new Error('no refresh token');
    }
    const refreshToken = decrypt(encryptedRefreshToken);
    const token = await authEndpointRefreshToken({ refreshToken });
    sessionStorage.setItem('accessToken', encrypt(token.accessToken));
    sessionStorage.setItem('expiredAt', token.expiredAt);
    return token.accessToken;
  } catch (e) {
    localStorage.removeItem('refreshToken');
    dispatch(setIsLogin(false));
    throw e;
  }
};

// eslint-disable-next-line
const privateRequestConfig = async <D = unknown, P = any>(
  method: string,
  url: string,
  options?: Options<D, P>,
) => {
  const encryptedAccessToken = sessionStorage.getItem('accessToken');
  let accessToken = encryptedAccessToken ? decrypt(encryptedAccessToken) : '';
  if (!checkAccessTokenAvailable(accessToken)) {
    accessToken = await getNewAccessTokenByRefreshToken();
  }

  return {
    ...defaultConfig,
    headers: {
      ...defaultHeader,
      ...options?.headers,
      'x-credential': accessToken,
    },
    data: options?.data,
    params: options?.params,
    url,
    method,
  };
};

// eslint-disable-next-line
const get = async <T, P = any>(url: string, options?: Options<any, P>) =>
  await axios.request<T>(publicRequestConfig<unknown, P>('get', url, options));

const post = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(publicRequestConfig<D>('post', url, options));

const put = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(publicRequestConfig<D>('put', url, options));

const patch = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(publicRequestConfig<D>('patch', url, options));

const sendDelete = async <T, D = unknown>(url: string, options?: Options<D>) =>
  await axios.request<T>(publicRequestConfig<D>('delete', url, options));

// eslint-disable-next-line
const authGet = async <T, P = any>(url: string, options?: Options<any, P>) => {
  const config = await privateRequestConfig<unknown, P>('get', url, options);
  return await axios.request<T>(config);
};

const authPost = async <T, D = unknown>(url: string, options?: Options<D>) => {
  const config = await privateRequestConfig<D>('post', url, options);
  return await axios.request<T>(config);
};

const authPut = async <T, D = unknown>(url: string, options?: Options<D>) => {
  const config = await privateRequestConfig<D>('put', url, options);
  return await axios.request<T>(config);
};

const authPatch = async <T, D = unknown>(url: string, options?: Options<D>) => {
  const config = await privateRequestConfig<D>('patch', url, options);
  return await axios.request<T>(config);
};

const authDelete = async <T, D = unknown>(url: string, options?: Options<D>) => {
  const config = await privateRequestConfig<D>('delete', url, options);
  return await axios.request<T>(config);
};

export default {
  get,
  post,
  put,
  patch,
  delete: sendDelete,
  authGet,
  authPost,
  authPut,
  authPatch,
  authDelete,
};
