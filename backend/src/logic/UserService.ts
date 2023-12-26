import { inject, injectable } from 'inversify';
import { FreeTarotAccess } from 'src/access/FreeTarotAccess';
import { UserAccess } from 'src/access/UserAccess';
import { GetUserResponse } from 'src/model/api/User';
import { FREE_QUOTA } from 'src/model/constant/Spread';
import { User, UserEntity } from 'src/model/entity/UserEntity';
import { GoogleService } from './GoogleService';

/**
 * Service class for User
 */
@injectable()
export class UserService {
  @inject(UserAccess)
  private readonly userAccess!: UserAccess;

  @inject(FreeTarotAccess)
  private readonly freeTarotAccess!: FreeTarotAccess;

  @inject(GoogleService)
  private readonly googleService!: GoogleService;

  public async getUserDetail(): Promise<GetUserResponse> {
    const info = await this.googleService.getUserInfo();
    let user = await this.userAccess.findOne({
      where: { email: info.email },
    });
    if (user === null) {
      const newUser = new UserEntity();
      newUser.email = info.email;
      newUser.role = 'user';
      newUser.balance = 0;

      user = await this.userAccess.save(newUser);
    }

    const freeTarot = await this.freeTarotAccess.find({
      where: {
        tarot: { userId: user.id },
      },
      order: { createdAt: 'desc' },
    });

    return {
      ...user,
      freeQuota: FREE_QUOTA - freeTarot.length,
      lastFree: freeTarot.length > 0 ? freeTarot[0].createdAt : null,
    };
  }

  public async getUserEntity(): Promise<User> {
    const info = await this.googleService.getUserInfo();

    return await this.userAccess.findOneOrFail({
      where: { email: info.email },
    });
  }
}
