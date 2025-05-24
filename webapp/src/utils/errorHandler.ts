import { AxiosError, isAxiosError } from 'axios';
import eventEmitter from './eventEmitter';

export type CustomError = {
  code: string;
  message: string;
  name: string;
  status: number;
};

export const axiosError = (e: unknown) => {
  if (isAxiosError(e)) return e as AxiosError<CustomError>;
  throw 'UNEXPECTED_ERROR';
};

export const defaultErrorMessage = (e: AxiosError<CustomError>) => {
  const status = e.response?.status;
  const code = e.response?.data.code;
  if (status === 401 && code === 'UNAUTHORIZED') {
    eventEmitter.emit('sessionExpired');

    return '請重新登入';
  }

  return '發生無預期錯誤，請重新再試，若反覆出現此問題，請聯絡客服人員。';
};
