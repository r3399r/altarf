import axios, { AxiosError } from 'axios';
import { inject, injectable } from 'inversify';
import { UnauthorizedError } from 'src/model/error';
import { UserInfo } from 'src/model/Google';
import { credentialSymbol } from 'src/utils/LambdaHelper';

/**
 * Service class for Google Api
 */
@injectable()
export class GoogleService {
  @inject(credentialSymbol)
  private readonly credential!: string;

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
