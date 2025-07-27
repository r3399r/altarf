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

  private getEmailBody(questionId: string) {
    const url =
      process.env.ENVR === 'prod'
        ? `https://lookout.celestialstudio.net/online/${questionId}`
        : `https://lookout-test.celestialstudio.net/online/${questionId}`;

    return {
      text: `親愛的使用者\n您好，收到塔羅解牌答覆`,
      html: `<html>
        <head>
            <style type="text/css">
                body {
                    max-width: 600px;
                    padding: 16px 10px;
                }
                p {
                    margin: 0 0 5px 0;
                }
                .header {
                    padding: 8px;
                    background-color: #0f293f;
                }
                .card {
                    background-color: #e8eff2;
                    color: #0f293f;
                    padding: 24px 16px 40px 16px;
                    margin-bottom: 16px;
                }
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                }
                .horizon {
                    margin: 24px 0;
                    background-color: #c3d7e7;
                    height: 1px;
                }
                .code {
                    font-weight: bold;
                    margin: 24px 0;
                }
                .contact {
                    font-size: 14px;
                    text-decoration: underline;
                }
                .org {
                    color: #698399;
                    font-size: 14px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="https://yue-public-bucket.s3.ap-southeast-1.amazonaws.com/altarf-email-logo.png"></img>
            </div>
            <div class="card">
                <div class="title">塔羅解牌答覆</div>
                <div class="horizon"></div>
                <div class="content">
                    <p>親愛的使用者</p>
                    <p>您在瞭望塔所占卜的問題，塔羅師已經回覆囉！請點<a class="contact" href="${url}" target="_blank">我</a>前往查看。</p>
                    <p>瞭望塔 Lookout</p>
                </div>
            </div>
            <div class="org">© Celetial Studio 2022 - ${new Date().getFullYear()}</div>
        </body>
        </html>`,
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
              Data: this.getEmailBody(tarotReading.questionId).text,
            },
            Html: {
              Charset: 'UTF-8',
              Data: this.getEmailBody(tarotReading.questionId).html,
            },
          },
          Subject: {
            Data: '塔羅師已回覆您的塔羅解牌提問',
          },
        },
        Source: 'lookout-noreply@celestialstudio.net',
      })
      .promise();

    return tarotReading;
  }
}
