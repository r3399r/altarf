import CryptoJS from 'crypto-js';

export const encrypt = (input: string) =>
  CryptoJS.AES.encrypt(input, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString();

export const decrypt = (input: string) => {
  const bytes = CryptoJS.AES.decrypt(input, import.meta.env.VITE_CRYPTO_SECRET_KEY);

  return bytes.toString(CryptoJS.enc.Utf8);
};
