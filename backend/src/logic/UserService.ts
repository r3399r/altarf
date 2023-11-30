import axios from 'axios';
import { inject, injectable } from 'inversify';
import { User } from 'src/model/Google';
import { credentialSymbol } from 'src/utils/LambdaHelper';

/**
 * Service class for User
 */
@injectable()
export class UserService {
  @inject(credentialSymbol)
  private readonly credential!: string;

  public async getUser() {
    const user = await axios.request<User>({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${this.credential}` },
    });
    console.log(JSON.stringify(user.data));
  }
}
