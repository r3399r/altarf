import { Lambda } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import { TarotCardAccess } from 'src/access/TarotCardAccess';
import { TarotDailyAccess } from 'src/access/TarotDailyAccess';
import { TarotInterpretationAiAccess } from 'src/access/TarotInterpretationAiAccess';
import { TarotInterpretationHumanAccess } from 'src/access/TarotInterpretationHumanAccess';
import { TarotQuestionAccess } from 'src/access/TarotQuestionAccess';
import { TarotQuestionCardAccess } from 'src/access/TarotQuestionCardAccess';
import { TarotSpreadAccess } from 'src/access/TarotSpreadAccess';
import { AI_COST, HUMAN_COST } from 'src/constant/Balance';
import { LIMIT, OFFSET } from 'src/constant/Pagination';
import { InterpretationHumanStatus } from 'src/constant/Tarot';
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
import { TarotCard } from 'src/model/entity/TarotCardEntity';
import { TarotDailyEntity } from 'src/model/entity/TarotDailyEntity';
import { TarotInterpretationAiEntity } from 'src/model/entity/TarotInterpretationAiEntity';
import { TarotInterpretationHumanEntity } from 'src/model/entity/TarotInterpretationHumanEntity';
import { TarotQuestionCardEntity } from 'src/model/entity/TarotQuestionCardEntity';
import { TarotQuestionEntity } from 'src/model/entity/TarotQuestionEntity';
import { TarotSpread } from 'src/model/entity/TarotSpreadEntity';
import { User } from 'src/model/entity/UserEntity';
import { BadRequestError, InternalServerError } from 'src/model/error';
import { CardDisplay } from 'src/model/Tarot';
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
  private tarotCards: TarotCard[] | null = null;
  private tarotSpreads: TarotSpread[] | null = null;

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

  @inject(TarotCardAccess)
  private readonly tarotCardAccess!: TarotCardAccess;

  @inject(TarotSpreadAccess)
  private readonly tarotSpreadAccess!: TarotSpreadAccess;

  @inject(TarotDailyAccess)
  private readonly tarotDailyAccess!: TarotDailyAccess;

  @inject(TarotInterpretationAiAccess)
  private readonly tarotInterpretationAiAccess!: TarotInterpretationAiAccess;

  @inject(TarotInterpretationHumanAccess)
  private readonly tarotInterpretationHumanAccess!: TarotInterpretationHumanAccess;

  private async getAllTarotCards() {
    if (this.tarotCards === null)
      this.tarotCards = await this.tarotCardAccess.find();

    return this.tarotCards;
  }

  private async getAllTarotSpreads() {
    if (this.tarotSpreads === null)
      this.tarotSpreads = await this.tarotSpreadAccess.find();

    return this.tarotSpreads.sort(compare('seqNo', 'asc')).map((v) => ({
      ...v,
      isAiSupport: v.id === 'SINGLE' || v.id === 'LINEAR',
    }));
  }

  public async getTarotDaily(): Promise<GetTaortDailyResponse> {
    const tartCards = await this.getAllTarotCards();
    const pickedCard = tartCards[random(tartCards.length)];
    const reversal = random(2) === 1 ? true : false;
    const pickedDaily = await this.tarotDailyAccess.find({
      where: {
        cardId: pickedCard.id,
        reversal,
      },
    });

    if (pickedDaily.length <= 0)
      throw new InternalServerError('there is no daily tarot');

    const firstTarot = pickedDaily.sort(compare('lastReadAt', 'asc', true))[0];
    firstTarot.lastReadAt = new Date().toISOString();
    await this.tarotDailyAccess.save(firstTarot);

    return {
      ...firstTarot,
      name: pickedCard.name,
      drawnAt: new Date().toISOString(),
    };
  }

  public async generateTarotDaily() {
    const tartCards = await this.getAllTarotCards();

    for (const card of tartCards) {
      console.log(card.name);
      for (const reversal of [true, false]) {
        console.log('reversal: ', reversal);

        const tarotDaily = new TarotDailyEntity();
        tarotDaily.cardId = card.id;
        tarotDaily.reversal = reversal;
        tarotDaily.interpretation = await this.generateTarotDailyByCard(
          card.name,
          reversal
        );
        await this.tarotDailyAccess.save(tarotDaily);
      }
    }
  }

  private async generateTarotDailyByCard(cardName: string, reversal: boolean) {
    const content =
      '你現在是塔羅占卜師，我會給你問題，以及我抽到的牌卡，你會給我清晰的觀點，如果抽到負面的牌卡，你會為我加油打氣，並且提供我建議，盡可能寫多一點，以唐綺陽的語氣來回答我的問題，不要自稱唐綺陽。我想問「今日運勢」我抽到「' +
      (reversal ? '逆位的' : '正位的') +
      cardName +
      '」';
    console.log('content: ', content);
    const chatCompletion = await this.openAiService.chatCompletion([
      { role: 'user', content },
    ]);
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
    const spreads = await this.getAllTarotSpreads();
    const spread = spreads.find((v) => v.id === spreadId);
    if (!spread) throw new BadRequestError('spread not found');
    if (Number(spread.drawnCardCount) !== card.length)
      throw new BadRequestError('card count not match');
  }

  public async getTarotQuestionById(
    id: string
  ): Promise<GetTarotQuestionIdResponse> {
    const { interpretationAi, interpretationHuman, ...tarotQuestion } =
      await this.tarotQuestionAccess.findOneByIdOrFail(id);
    const interpretation = [
      ...interpretationAi.map((v) => ({
        id: v.id,
        interpretation: v.interpretation,
        askedAt: v.createdAt,
        repliedAt: v.updatedAt,
        isAi: true,
      })),
      ...interpretationHuman.map((v) => ({
        id: v.id,
        interpretation: v.interpretation,
        askedAt: v.createdAt,
        repliedAt: v.updatedAt,
        isAi: false,
      })),
    ].sort(compare('repliedAt', 'desc', true));

    return {
      ...tarotQuestion,
      interpretation,
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
    const tarotSpread = await this.getAllTarotSpreads();
    const tarotCard = await this.getAllTarotCards();

    return { spread: tarotSpread, card: tarotCard };
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
      data: tarotQuestion.map((v) => ({
        id: v.id,
        question: v.question,
        spread: v.spread,
        createdAt: v.createdAt,
      })),
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

    const tarotInterpretationAi = new TarotInterpretationAiEntity();
    tarotInterpretationAi.questionId = tarotQuestion.id;
    const newEntity = await this.tarotInterpretationAiAccess.save(
      tarotInterpretationAi
    );

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

    const existedTarotInterpretation =
      await this.tarotInterpretationHumanAccess.findOne({
        where: { readerId: reader.id, questionId: tarotQuestion.id },
      });
    if (existedTarotInterpretation !== null)
      throw new BadRequestError('already asked human interpretation');

    const tarotInterpretationHuman = new TarotInterpretationHumanEntity();
    tarotInterpretationHuman.questionId = tarotQuestion.id;
    tarotInterpretationHuman.readerId = reader.id;
    tarotInterpretationHuman.status = InterpretationHumanStatus.IN_PROGRESS;

    return await this.tarotInterpretationHumanAccess.save(
      tarotInterpretationHuman
    );
  }
}
