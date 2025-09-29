import { inject, injectable } from 'inversify';
import { POINT_MONTHLY } from 'src/constant/Balance';
import { UserService } from './UserService';

/**
 * Service class for TarotTimer
 */
@injectable()
export class TarotTimerService {
  @inject(UserService)
  private readonly userService!: UserService;

  public async sendMonthlyGift() {
    const users = await this.userService.getUserList();

    await Promise.all(
      users.map((v) =>
        this.userService.depositForUser(v, POINT_MONTHLY, '每月贈點')
      )
    );
  }
}
