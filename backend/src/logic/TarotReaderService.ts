import { SES } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import { TarotReadingHumanAccess } from 'src/access/TarotReadingHumanAccess';
import { LIMIT, OFFSET } from 'src/constant/Pagination';
import { ReadingHumanStatus } from 'src/constant/Tarot';
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
  @inject(TarotReadingHumanAccess)
  private readonly tarotReadingHumanAccess!: TarotReadingHumanAccess;

  private async getUserInfo() {
    return await this.userService.getUserEntity();
  }

  public async getQuestionListByReader(
    params: GetTarotReaderQuestionParams | null
  ): Promise<GetTarotReaderQuestionResponse> {
    const user = await this.getUserInfo();

    const limit = params?.limit ? Number(params.limit) : LIMIT;
    const offset = params?.offset ? Number(params.offset) : OFFSET;
    const [data, total] = await this.tarotReadingHumanAccess.findAndCount({
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
    const tarotReading = await this.tarotReadingHumanAccess.findOneOrFail({
      where: {
        id,
        status: ReadingHumanStatus.IN_PROGRESS,
        readerId: user.id,
      },
    });

    tarotReading.reading = data.reading;
    tarotReading.status = ReadingHumanStatus.DONE;
    await this.tarotReadingHumanAccess.save(tarotReading);

    await this.ses
      .sendEmail({
        Destination: { ToAddresses: [tarotReading.question.user.email] },
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

    return tarotReading;
  }
}
