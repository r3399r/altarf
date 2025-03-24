import { inject, injectable } from 'inversify';
import {
  PostAuthRefreshRequest,
  PostAuthRefreshResponse,
  PostAuthRequest,
  PostAuthResponse,
} from 'src/model/api/Auth';
import { GoogleService } from './GoogleService';

/**
 * Service class for Auth
 */
@injectable()
export class AuthService {
  @inject(GoogleService)
  private readonly googleService!: GoogleService;

  public async exchangeToken(data: PostAuthRequest): Promise<PostAuthResponse> {
    const token = await this.googleService.exchangeToken(data.code);

    return {
      accessToken: token.access_token,
      expiredAt: new Date(Date.now() + token.expires_in * 1000).toISOString(),
      refreshToken: token.refresh_token,
    };
  }

  public async getNewAccessToken(
    data: PostAuthRefreshRequest
  ): Promise<PostAuthRefreshResponse> {
    const token = await this.googleService.getNewAccessToken(data.refreshToken);

    return {
      accessToken: token.access_token,
      expiredAt: new Date(Date.now() + token.expires_in * 1000).toISOString(),
    };
  }
}
