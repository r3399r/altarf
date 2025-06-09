import { inject, injectable } from 'inversify';
import { TarotInterpretationHumanAccess } from 'src/access/TarotInterpretationHumanAccess';
import { InterpretationHumanStatus } from 'src/constant/Tarot';
import {
  GetTarotReaderQuestionResponse,
  PostTarotReaderQuestionIdRequest,
  PostTarotReaderQuestionIdResponse,
} from 'src/model/api/Tarot';
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

  public async getQuestionListByReader(): Promise<GetTarotReaderQuestionResponse> {
    const user = await this.getUserInfo();

    return await this.tarotInterpretationHumanAccess.find({
      where: {
        readerId: user.id,
        status: InterpretationHumanStatus.IN_PROGRESS,
      },
    });
  }

  public async replyTarotQuestionByReader(
    id: string,
    data: PostTarotReaderQuestionIdRequest
  ): Promise<PostTarotReaderQuestionIdResponse> {
    const user = await this.getUserInfo();
    const tarotInterpretation =
      await this.tarotInterpretationHumanAccess.findOneOrFail({
        where: {
          id,
          status: InterpretationHumanStatus.IN_PROGRESS,
          readerId: user.id,
        },
      });

    tarotInterpretation.interpretation = data.interpretation;
    tarotInterpretation.status = InterpretationHumanStatus.DONE;
    await this.tarotInterpretationHumanAccess.save(tarotInterpretation);

    return tarotInterpretation;
  }
}
