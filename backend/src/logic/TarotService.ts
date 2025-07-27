import { Lambda, SES } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import { TarotDailyAccess } from 'src/access/TarotDailyAccess';
import { TarotQuestionAccess } from 'src/access/TarotQuestionAccess';
import { TarotQuestionCardAccess } from 'src/access/TarotQuestionCardAccess';
import { TarotReadingAiAccess } from 'src/access/TarotReadingAiAccess';
import { TarotReadingHumanAccess } from 'src/access/TarotReadingHumanAccess';
import { AI_COST, HUMAN_COST } from 'src/constant/Balance';
import { LIMIT, OFFSET } from 'src/constant/Pagination';
import {
  ReadingHumanStatus,
  TAROT_CARD_LIST,
  TAROT_SPREAD_LIST,
} from 'src/constant/Tarot';
import {
  GetTaortDailyResponse,
  GetTarotBasicInfoResponse,
  GetTarotQuestionIdResponse,
  GetTarotQuestionParams,
  GetTarotQuestionResponse,
  PostTarotQuestionIdAiResponse,
  PostTarotQuestionIdHumanResponse,
  PostTarotQuestionRequest,
  PostTarotQuestionResponse,
} from 'src/model/api/Tarot';
import { TarotDailyEntity } from 'src/model/entity/TarotDailyEntity';
import { TarotQuestionCardEntity } from 'src/model/entity/TarotQuestionCardEntity';
import { TarotQuestionEntity } from 'src/model/entity/TarotQuestionEntity';
import { TarotReadingAiEntity } from 'src/model/entity/TarotReadingAiEntity';
import { TarotReadingHumanEntity } from 'src/model/entity/TarotReadingHumanEntity';
import { User } from 'src/model/entity/UserEntity';
import { BadRequestError, InternalServerError } from 'src/model/error';
import { CardDisplay, TarotCard, TarotSpread } from 'src/model/Tarot';
import { compare } from 'src/utils/compare';
import { genPagination } from 'src/utils/paginator';
import { random } from 'src/utils/random';
import { OpenAiService } from './OpenAiService';
import { UserService } from './UserService';

/**
 * Service class for Tarot
 */
@injectable()
export class TarotService {
  @inject(SES)
  private readonly ses!: SES;
  @inject(Lambda)
  private readonly lambda!: Lambda;

  @inject(OpenAiService)
  private readonly openAiService!: OpenAiService;

  @inject(TarotQuestionAccess)
  private readonly tarotQuestionAccess!: TarotQuestionAccess;

  @inject(TarotQuestionCardAccess)
  private readonly tarotQuestionCardAccess!: TarotQuestionCardAccess;

  @inject(UserService)
  private readonly userService!: UserService;

  @inject(TarotDailyAccess)
  private readonly tarotDailyAccess!: TarotDailyAccess;

  @inject(TarotReadingAiAccess)
  private readonly tarotReadingAiAccess!: TarotReadingAiAccess;

  @inject(TarotReadingHumanAccess)
  private readonly tarotReadingHumanAccess!: TarotReadingHumanAccess;

  private tarotCards: TarotCard[] = TAROT_CARD_LIST;
  private tarotSpreads: TarotSpread[] = TAROT_SPREAD_LIST;

  public async getTarotDaily(): Promise<GetTaortDailyResponse> {
    const pickedCard = this.tarotCards[random(this.tarotCards.length)];
    const reversal = random(2) === 1 ? true : false;
    const pickedDaily = await this.tarotDailyAccess.findOne({
      where: {
        cardId: pickedCard.id,
        reversal,
      },
      order: {
        lastReadAt: 'ASC',
      },
    });

    if (pickedDaily === null)
      throw new InternalServerError('there is no daily tarot');

    pickedDaily.lastReadAt = new Date().toISOString();
    await this.tarotDailyAccess.save(pickedDaily);

    return {
      ...pickedDaily,
      name: pickedCard.name,
      drawnAt: new Date().toISOString(),
    };
  }

  public async generateTarotDaily() {
    const earliestReadList = await this.tarotDailyAccess.findEarliestReadList();

    const diversedCards = this.tarotCards.filter((v) =>
      v.id.startsWith(`${process.env.TAROT_PREFIX}`)
    );
    for (const card of diversedCards)
      for (const reversal of [true, false]) {
        console.log('card: ' + card.name + ', reversal: ' + reversal);
        const earliestRead = earliestReadList.find(
          (v) => v.cardId === card.id && v.reversal === (reversal ? 1 : 0)
        );
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        if (
          earliestRead === undefined ||
          new Date(earliestRead.earliestReadAt) > oneDayAgo
        ) {
          const tarotDaily = new TarotDailyEntity();
          tarotDaily.cardId = card.id;
          tarotDaily.reversal = reversal;
          tarotDaily.reading = await this.generateTarotDailyByCard(
            card.name,
            reversal
          );
          tarotDaily.lastReadAt = new Date(0).toISOString();
          await this.tarotDailyAccess.save(tarotDaily);
        }
      }
  }

  private async generateTarotDailyByCard(cardName: string, reversal: boolean) {
    const chatCompletion = await this.openAiService.askTarotQuestion(
      `抽到的卡牌為「${(reversal ? '逆位的' : '正位的') + cardName}」`,
      '請問今日運勢'
    );
    console.log(JSON.stringify(chatCompletion));

    return chatCompletion.choices[0].message.content;
  }

  private async getUserInfo() {
    return await this.userService.getUserEntity();
  }

  private async createTarotQuestion(data: {
    question: string;
    spreadId: string;
    userId: string;
    card: CardDisplay[];
  }) {
    const tarotQuestion = new TarotQuestionEntity();
    tarotQuestion.question = data.question;
    tarotQuestion.spreadId = data.spreadId;
    tarotQuestion.userId = data.userId;

    const newTarotQuestion = await this.tarotQuestionAccess.save(tarotQuestion);

    let n = 0;
    for (const card of data.card) {
      const tarotQuestionCard = new TarotQuestionCardEntity();
      tarotQuestionCard.questionId = newTarotQuestion.id;
      tarotQuestionCard.cardId = card.id;
      tarotQuestionCard.reversal = card.reversed;
      tarotQuestionCard.sequence = String(n);
      await this.tarotQuestionCardAccess.save(tarotQuestionCard);
      n++;
    }

    return newTarotQuestion;
  }

  private checkUserQuota(user: User) {
    if (user.balance < 0)
      throw new BadRequestError(
        'balance is less than 0',
        'BALANCE_INSUFFICIENT'
      );
  }

  private async validateSpread(spreadId: string, card: CardDisplay[]) {
    const spread = this.tarotSpreads.find((v) => v.id === spreadId);
    if (!spread) throw new BadRequestError('spread not found');
    if (Number(spread.drawnCardCount) !== card.length)
      throw new BadRequestError('card count not match');
  }

  public async getTarotQuestionById(
    id: string
  ): Promise<GetTarotQuestionIdResponse> {
    const { readingAi, readingHuman, ...tarotQuestion } =
      await this.tarotQuestionAccess.findOneByIdOrFail(id);
    const reading = [
      ...readingAi.map((v) => ({
        id: v.id,
        reading: v.reading,
        askedAt: v.createdAt,
        repliedAt: v.updatedAt,
        isAi: true,
      })),
      ...readingHuman.map((v) => ({
        id: v.id,
        reading: v.reading,
        askedAt: v.createdAt,
        repliedAt: v.updatedAt,
        isAi: false,
      })),
    ].sort(compare('repliedAt', 'desc', true));

    return {
      ...tarotQuestion,
      reading,
    };
  }

  public async genNewQuestion(
    data: PostTarotQuestionRequest
  ): Promise<PostTarotQuestionResponse> {
    await this.validateSpread(data.spreadId, data.card);

    const user = await this.getUserInfo();

    return await this.createTarotQuestion({
      question: data.question,
      spreadId: data.spreadId,
      userId: user.id,
      card: data.card,
    });
  }

  public async getBasicInfo(): Promise<GetTarotBasicInfoResponse> {
    return { spread: this.tarotSpreads, card: this.tarotCards };
  }

  public async getTarotQuestionList(
    params: GetTarotQuestionParams | null
  ): Promise<GetTarotQuestionResponse> {
    const user = await this.getUserInfo();

    const limit = params?.limit ? Number(params.limit) : LIMIT;
    const offset = params?.offset ? Number(params.offset) : OFFSET;
    const [tarotQuestion, total] = await this.tarotQuestionAccess.findAndCount({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return {
      data: tarotQuestion.map((v) => {
        const spread = this.tarotSpreads.find((s) => s.id === v.spreadId);
        if (spread === undefined)
          throw new InternalServerError('spread not found');

        return {
          id: v.id,
          question: v.question,
          spread,
          createdAt: v.createdAt,
        };
      }),
      paginate: genPagination(total, limit, offset),
    };
  }

  public async invokeTarotAiAgent(
    id: string
  ): Promise<PostTarotQuestionIdAiResponse> {
    const user = await this.getUserInfo();

    const tarotQuestion = await this.tarotQuestionAccess.findOneByIdOrFail(id);
    if (tarotQuestion.userId !== user.id)
      throw new BadRequestError('userId not match');

    if (
      tarotQuestion.spreadId !== 'SINGLE' &&
      tarotQuestion.spreadId !== 'LINEAR'
    )
      throw new BadRequestError(
        'spreadId is not SINGLE or LINEAR',
        'SPREAD_NOT_SUPPORT_AI'
      );

    this.checkUserQuota(user);
    await this.userService.purchaseForUser(user, AI_COST, 'AI解牌');

    const tarotReadingAi = new TarotReadingAiEntity();
    tarotReadingAi.questionId = tarotQuestion.id;
    const newEntity = await this.tarotReadingAiAccess.save(tarotReadingAi);

    await this.lambda
      .invoke({
        FunctionName: `${process.env.PROJECT}-${process.env.ENVR}-ai-agent`,
        Payload: JSON.stringify({
          id: newEntity.id,
        }),
        InvocationType: 'Event',
      })
      .promise();

    return newEntity;
  }

  private getEmailBody(question: string) {
    const url =
      process.env.ENVR === 'prod'
        ? `https://lookout.celestialstudio.net/reader`
        : `https://lookout-test.celestialstudio.net/reader`;

    return {
      text: `親愛的塔羅師\n您好，收到新的塔羅解牌提問`,
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
                <div class="title">新的塔羅解牌提問</div>
                <div class="horizon"></div>
                <div class="content">
                    <p>親愛的塔羅師</p>
                    <p>收到一個給您的塔羅解牌提問，題目是:</p>
                    <div class="code">${question}</div>
                    <p>請儘速至<a class="contact" href="${url}" target="_blank">後台</a>進行答覆！謝謝</p>
                    <p>瞭望塔 Lookout</p>
                </div>
            </div>
            <div class="org">© Celetial Studio 2022 - ${new Date().getFullYear()}</div>
        </body>
        </html>`,
    };
  }

  public async askHumanTarotQuestion(
    id: string
  ): Promise<PostTarotQuestionIdHumanResponse> {
    const user = await this.getUserInfo();

    const tarotQuestion = await this.tarotQuestionAccess.findOneByIdOrFail(id);
    if (tarotQuestion.userId !== user.id)
      throw new BadRequestError('userId not match');

    this.checkUserQuota(user);
    await this.userService.purchaseForUser(user, HUMAN_COST, '真人解牌');

    const reader = await this.userService.getReader();

    const existedTarotReading = await this.tarotReadingHumanAccess.findOne({
      where: { readerId: reader.id, questionId: tarotQuestion.id },
    });
    if (existedTarotReading !== null)
      throw new BadRequestError('already asked human reading');

    const tarotReadingHuman = new TarotReadingHumanEntity();
    tarotReadingHuman.questionId = tarotQuestion.id;
    tarotReadingHuman.readerId = reader.id;
    tarotReadingHuman.status = ReadingHumanStatus.IN_PROGRESS;

    await this.ses
      .sendEmail({
        Destination: { ToAddresses: [reader.email] },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: this.getEmailBody(tarotQuestion.question).text,
            },
            Html: {
              Charset: 'UTF-8',
              Data: this.getEmailBody(tarotQuestion.question).html,
            },
          },
          Subject: {
            Data: '您收到新的解牌諮詢',
          },
        },
        Source: 'lookout-noreply@celestialstudio.net',
      })
      .promise();

    return await this.tarotReadingHumanAccess.save(tarotReadingHuman);
  }
}
