import { SES } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import { Not } from 'typeorm';
import { TarotReadingHumanAccess } from 'src/access/TarotReadingHumanAccess';
import { POINT_MONTHLY } from 'src/constant/Balance';
import { ReadingHumanStatus } from 'src/constant/Tarot';
import { UserService } from './UserService';

/**
 * Service class for TarotLoader
 */
@injectable()
export class TarotLoaderService {
  @inject(SES)
  private readonly ses!: SES;
  @inject(UserService)
  private readonly userService!: UserService;
  @inject(TarotReadingHumanAccess)
  private readonly tarotReadingHumanAccess!: TarotReadingHumanAccess;

  public async sendMonthlyGift() {
    const users = await this.userService.getUserList();

    await Promise.all(
      users.map((v) => {
        if (v.reader !== null) return;

        return this.userService.depositForUser(v, POINT_MONTHLY, '每月贈點');
      })
    );
  }

  private getEmailBody() {
    const url =
      process.env.ENVR === 'prod'
        ? 'https://lookout.celestialstudio.net/reader'
        : 'https://lookout-test.celestialstudio.net/reader';

    return {
      text: `親愛的塔羅師\n您好，此信件主要是提醒您有未回覆的塔羅解牌提問`,
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
                <div class="title">未回覆的塔羅解牌提問提醒</div>
                <div class="horizon"></div>
                <div class="content">
                    <p>親愛的塔羅師</p>
                    <p>提醒您，您還有尚未回覆的解牌要求，請儘速至<a class="contact" href="${url}" target="_blank">後台</a>進行答覆！謝謝</p>
                    <p>瞭望塔 Lookout</p>
                </div>
            </div>
            <div class="org">© Celestial Studio 2022 - ${new Date().getFullYear()}</div>
        </body>
        </html>`,
    };
  }

  public async remindUnansweredQuestions() {
    const unansweredQuestions = await this.tarotReadingHumanAccess.find({
      where: { status: Not(ReadingHumanStatus.DONE) },
    });

    const readers = new Set(
      unansweredQuestions.map((q) => q.reader.user.email)
    );
    for (const email of readers)
      await this.ses
        .sendEmail({
          Destination: { ToAddresses: [email] },
          Message: {
            Body: {
              Text: {
                Charset: 'UTF-8',
                Data: this.getEmailBody().text,
              },
              Html: {
                Charset: 'UTF-8',
                Data: this.getEmailBody().html,
              },
            },
            Subject: {
              Data: '未回覆的塔羅解牌提問提醒',
            },
          },
          Source: 'lookout-noreply@celestialstudio.net',
        })
        .promise();
  }
}
