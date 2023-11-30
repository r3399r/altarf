import axios from 'axios';
import { inject, injectable } from 'inversify';
import { UserAccess } from 'src/access/UserAccess';
import { UserEntity } from 'src/model/entity/UserEntity';
import { User } from 'src/model/Google';
import { credentialSymbol } from 'src/utils/LambdaHelper';

/**
 * Service class for User
 */
@injectable()
export class UserService {
  @inject(credentialSymbol)
  private readonly credential!: string;

  @inject(UserAccess)
  private readonly userAccess!: UserAccess;

  public async getUser() {
    const res = await axios.request<User>({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${this.credential}` },
    });
    const user = new UserEntity();
    user.email = res.data.email;
    user.role = 'user';
    user.balance = 0;

    return await this.userAccess.save(user);
  }
}
