import axios from 'axios';
import { inject, injectable } from 'inversify';
import { UnauthorizedError } from 'src/model/error';
import { CodeResponse, RefreshTokenResponse, UserInfo } from 'src/model/Google';
import { credentialSymbol } from 'src/utils/LambdaHelper';

/**
 * Service class for Google Api
 */
@injectable()
export class GoogleService {
  @inject(credentialSymbol)
  private readonly credential!: string;

  public async exchangeToken(code: string, redirectUri: string) {
    const res = await axios.request<CodeResponse>({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      params: {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: redirectUri,
      },
    });

    return res.data;
  }

  public async getNewAccessToken(refreshToken: string) {
    const res = await axios.request<RefreshTokenResponse>({
      method: 'POST',
      url: 'https://oauth2.googleapis.com/token',
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      },
    });

    return res.data;
  }

  public async getUserInfo(): Promise<UserInfo> {
    try {
      const res = await axios.request<UserInfo>({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: { Authorization: `Bearer ${this.credential}` },
      });

      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.statusText === 'Unauthorized')
        throw new UnauthorizedError('google unauthorized');

      throw e;
    }
  }
}
