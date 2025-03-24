export type PostAuthRequest = {
  code: string;
};

export type PostAuthResponse = {
  accessToken: string;
  refreshToken: string;
  expiredAt: string;
};

export type PostAuthRefreshRequest = {
  refreshToken: string;
};

export type PostAuthRefreshResponse = {
  accessToken: string;
  expiredAt: string;
};
