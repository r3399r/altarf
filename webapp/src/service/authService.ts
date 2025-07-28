import authEndpoint from 'src/api/authEndpoint';
import { PostAuthResponse } from 'src/model/backend/api/Auth';
import { dispatch } from 'src/redux/store';
import { finishWaiting, setBalance, setEmail, setIsLogin, startWaiting } from 'src/redux/uiSlice';
import { encrypt } from 'src/utils/crypto';

const exchangeToken = async (code: string) => {
  const res = await authEndpoint.postAuth({ code });

  return res.data;
};

const saveToken = async (token: PostAuthResponse) => {
  const encryptedAccessToken = encrypt(token.accessToken);
  const encryptedRefreshToken = encrypt(token.refreshToken);

  sessionStorage.setItem('accessToken', encryptedAccessToken);
  sessionStorage.setItem('expiredAt', token.expiredAt);
  localStorage.setItem('refreshToken', encryptedRefreshToken);
};

export const login = async (code: string) => {
  try {
    dispatch(startWaiting());
    const token = await exchangeToken(code);
    saveToken(token);
    dispatch(setIsLogin(true));
  } finally {
    dispatch(finishWaiting());
  }
};

export const logout = () => {
  try {
    dispatch(startWaiting());
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('expiredAt');
    localStorage.removeItem('refreshToken');
    dispatch(setIsLogin(false));
    dispatch(setBalance(null));
    dispatch(setEmail(null));
  } finally {
    dispatch(finishWaiting());
  }
};
