import axios, { AxiosError } from 'axios';
import eventEmitter from './eventEmitter';

export type CustomError = {
  code: string;
  message: string;
  name: string;
  status: number;
};

export const axiosError = (e: unknown) => {
  if (axios.isAxiosError(e)) return e as AxiosError<CustomError>;
  throw 'UNEXPECTED_ERROR';
};

export const defaultErrorMessage = (e: AxiosError<CustomError>) => {
  const status = e.response?.status;
  const code = e.response?.data.code;
  if (status === 401 && code === 'UNAUTHORIZED') {
    eventEmitter.emit('sessionExpired');

    return 'UNAUTHORIZED';
  }

  return 'UNEXPECTED_ERROR';
};
