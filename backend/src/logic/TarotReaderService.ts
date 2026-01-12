import { SES } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import { In } from 'typeorm';
import { ReaderAccess } from 'src/access/ReaderAccess';
import { ReaderSocialAccess } from 'src/access/ReaderSocialAccess';
import { TarotReadingHumanAccess } from 'src/access/TarotReadingHumanAccess';
import { LIMIT, OFFSET } from 'src/constant/Pagination';
import { ReadingHumanStatus } from 'src/constant/Tarot';
import {
  GetTarotReaderQuestionParams,
  GetTarotReaderQuestionResponse,
  GetTarotReaderResponse,
  PostTarotReaderQuestionIdRequest,
  PostTarotReaderQuestionIdResponse,
  PutTarotReaderRequest,
  PutTarotReaderResponse,
} from 'src/model/api/Tarot';
import { ReaderSocialEntity } from 'src/model/entity/ReaderSocialEntity';
import { fee } from 'src/utils/calculator';
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
  @inject(ReaderAccess)
  private readonly readerAccess!: ReaderAccess;
  @inject(ReaderSocialAccess)
  private readonly readerSocialAccess!: ReaderSocialAccess;
  @inject(TarotReadingHumanAccess)
  private readonly tarotReadingHumanAccess!: TarotReadingHumanAccess;

  private async getUserInfo() {
    return await this.userService.getUserEntity();
  }

  public async getAllReaders(): Promise<GetTarotReaderResponse> {
    const readers = await this.readerAccess.find();

    return readers.map((r) => ({
      ...r,
      costPerReading: r.costPerReading + fee(r.costPerReading),
    }));
  }

  public async updateReaderProfile(
    id: string,
    data: PutTarotReaderRequest
  ): Promise<PutTarotReaderResponse> {
    const user = await this.getUserInfo();
    if (user.reader == null) throw new Error('User is not a reader');

    const reader = await this.readerAccess.findOneOrFail({
      where: { id },
    });

    reader.nickname = data.nickname;
    reader.bio = data.bio;
    reader.costPerReading = data.costPerReading;
    await this.readerAccess.save(reader);

    for (const s of reader.social) await this.readerSocialAccess.delete(s.id);
    for (const s of data.social) {
      const social = new ReaderSocialEntity();
      social.readerId = reader.id;
      social.platform = s.platform;
      social.url = s.url;
      await this.readerSocialAccess.save(social);
    }

    return await this.readerAccess.findOneOrFail({
      where: { id },
    });
  }

  public async getQuestionListByReader(
    params: GetTarotReaderQuestionParams | null
  ): Promise<GetTarotReaderQuestionResponse> {
    const user = await this.getUserInfo();

    const limit = params?.limit ? Number(params.limit) : LIMIT;
    const offset = params?.offset ? Number(params.offset) : OFFSET;
    if (user.reader == null) throw new Error('User is not a reader');

    const [data, total] = await this.tarotReadingHumanAccess.findAndCount({
      where: {
        readerId: user.reader.id,
        status: params?.status ? In(params.status.split(',')) : undefined,
      },
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
            <div class="org">© Celestial Studio 2022 - ${new Date().getFullYear()}</div>
        </body>
        </html>`,
    };
  }

  public async replyTarotQuestion(
    id: string,
    data: PostTarotReaderQuestionIdRequest
  ): Promise<PostTarotReaderQuestionIdResponse> {
    const user = await this.getUserInfo();
    if (user.reader == null) throw new Error('User is not a reader');

    const tarotReading = await this.tarotReadingHumanAccess.findOneOrFail({
      where: {
        id,
        readerId: user.reader.id,
      },
    });

    if (tarotReading.viewedAt === null)
      tarotReading.viewedAt = tarotReading.createdAt;
    tarotReading.repliedAt = new Date().toISOString();
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

  public async startTarotQuestion(id: string): Promise<void> {
    const user = await this.getUserInfo();
    if (user.reader == null) throw new Error('User is not a reader');

    const tarotReading = await this.tarotReadingHumanAccess.findOneOrFail({
      where: {
        id,
        readerId: user.reader.id,
      },
    });

    if (tarotReading.status !== ReadingHumanStatus.OPEN) return;

    tarotReading.viewedAt = new Date().toISOString();
    tarotReading.status = ReadingHumanStatus.IN_PROGRESS;
    await this.tarotReadingHumanAccess.save(tarotReading);
  }
}
