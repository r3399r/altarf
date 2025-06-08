import { inject, injectable } from 'inversify';
import { TarotInterpretationHumanAccess } from 'src/access/TarotInterpretationHumanAccess';
import { InterpretationHumanStatus } from 'src/constant/Tarot';
import { UserService } from './UserService';

/**
 * Service class for TarotReader
 */
@injectable()
export class TarotReaderService {
  @inject(UserService)
  private readonly userService!: UserService;
  @inject(TarotInterpretationHumanAccess)
  private readonly tarotInterpretationHumanAccess!: TarotInterpretationHumanAccess;

  private async getUserInfo() {
    return await this.userService.getUserEntity();
  }

  public async getQuestionListByReader() {
    const user = await this.getUserInfo();

    return await this.tarotInterpretationHumanAccess.find({
      where: {
        readerId: user.id,
        status: InterpretationHumanStatus.IN_PROGRESS,
      },
    });
  }
}
