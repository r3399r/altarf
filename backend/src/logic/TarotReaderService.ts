import { SES } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import { TarotInterpretationHumanAccess } from 'src/access/TarotInterpretationHumanAccess';
import { LIMIT, OFFSET } from 'src/constant/Pagination';
import { InterpretationHumanStatus } from 'src/constant/Tarot';
import {
  GetTarotReaderQuestionParams,
  GetTarotReaderQuestionResponse,
  PostTarotReaderQuestionIdRequest,
  PostTarotReaderQuestionIdResponse,
} from 'src/model/api/Tarot';
import { genPagination } from 'src/utils/paginator';
import { UserService } from './UserService';

/**
 * Service class for TarotReader
 */
@injectable()
export class TarotReaderService {
  @inject(SES)
  private readonly ses!: SES;
  @inject(UserService)
  private readonly userService!: UserService;
  @inject(TarotInterpretationHumanAccess)
  private readonly tarotInterpretationHumanAccess!: TarotInterpretationHumanAccess;

  private async getUserInfo() {
    return await this.userService.getUserEntity();
  }

  public async getQuestionListByReader(
    params: GetTarotReaderQuestionParams | null
  ): Promise<GetTarotReaderQuestionResponse> {
    const user = await this.getUserInfo();

    const limit = params?.limit ? Number(params.limit) : LIMIT;
    const offset = params?.offset ? Number(params.offset) : OFFSET;
    const [data, total] =
      await this.tarotInterpretationHumanAccess.findAndCount({
        where: { readerId: user.id },
        order: { createdAt: 'DESC' },
        take: limit,
        skip: offset,
      });

    return {
      data,
      paginate: genPagination(total, limit, offset),
    };
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

    await this.ses
      .sendEmail({
        Destination: { ToAddresses: [tarotInterpretation.question.user.email] },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: 'Tarot Reader has replied to your question. Please check the result',
            },
            Html: {
              Charset: 'UTF-8',
              Data: 'Tarot Reader has replied to your question. Please check the result',
            },
          },
          Subject: {
            Data: 'Tarot Reader Reply',
          },
        },
        Source: 'lookout-noreply@celestialstudio.net',
      })
      .promise();

    return tarotInterpretation;
  }
}
