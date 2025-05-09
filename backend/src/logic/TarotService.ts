import { inject, injectable } from 'inversify';
import { Not } from 'typeorm';
import { TarotCardAccess } from 'src/access/TarotCardAccess';
import { TarotDailyAccess } from 'src/access/TarotDailyAccess';
import { TarotInterpretationAiAccess } from 'src/access/TarotInterpretationAiAccess';
import { TarotQuestionAccess } from 'src/access/TarotQuestionAccess';
import { TarotQuestionCardAccess } from 'src/access/TarotQuestionCardAccess';
import { TarotSpreadAccess } from 'src/access/TarotSpreadAccess';
import {
  GetTaortDailyResponse,
  GetTarotBasicInfoResponse,
  GetTarotQuestionResponse,
  PostTarotQuestionRequest,
  PostTarotQuestionResponse,
  TarotEvent,
} from 'src/model/api/Tarot';
import { TarotCard } from 'src/model/entity/TarotCardEntity';
import { TarotDailyEntity } from 'src/model/entity/TarotDailyEntity';
import { TarotInterpretationAiEntity } from 'src/model/entity/TarotInterpretationAiEntity';
import { TarotQuestionCardEntity } from 'src/model/entity/TarotQuestionCardEntity';
import { TarotQuestionEntity } from 'src/model/entity/TarotQuestionEntity';
import { TarotSpread } from 'src/model/entity/TarotSpreadEntity';
import { User } from 'src/model/entity/UserEntity';
import { BadRequestError, InternalServerError } from 'src/model/error';
import { CardDisplay } from 'src/model/Tarot';
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

  // @inject(Lambda)
  // private readonly lambda!: Lambda;

  @inject(OpenAiService)
  private readonly openAiService!: OpenAiService;

  @inject(TarotInterpretationAiAccess)
  private readonly tarotInterpretationAiAccess!: TarotInterpretationAiAccess;

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

  private async getAllTarotCards() {
    if (this.tarotCards === null)
      this.tarotCards = await this.tarotCardAccess.find();

    return this.tarotCards;
  }

  private async getAllTarotSpreads() {
    if (this.tarotSpreads === null)
      this.tarotSpreads = await this.tarotSpreadAccess.find({
        order: { seqNo: 'asc' },
      });

    return this.tarotSpreads;
  }

  public async questionReplyFromAi(data: TarotEvent) {
    const tarotQuestion = await this.tarotQuestionAccess.findOneByIdOrFail(
      data.id
    );

    const now = new Date().getTime();

    let content =
      '你現在是塔羅占卜師，我會給你問題，以及我抽到的牌卡，你會給我清晰的觀點，如果抽到負面的牌卡，你會為我加油打氣，並且提供我建議，盡可能寫多一點，以唐綺陽的語氣來回答我的問題，不要自稱唐綺陽。';

    switch (tarotQuestion.spreadId) {
      case 'SINGLE':
        break;
      case 'LINEAR':
        content += '三張牌分別代表「過去」、「現在」、「未來」，';
        break;
    }
    content += `我想問「${tarotQuestion.question}」`;

    const translateCards = tarotQuestion.card.map((v) =>
      v.reversal ? '逆位的' : '正位的' + v.card.name
    );
    content += `我抽到${translateCards.map((v) => `「${v}」`).join('、')}`;
    console.log(content);

    const chatCompletion = await this.openAiService.chatCompletion([
      { role: 'user', content },
    ]);
    const elapsedTime = new Date().getTime() - now;

    const tarotInterpretationAi = new TarotInterpretationAiEntity();
    tarotInterpretationAi.questionId = tarotQuestion.id;
    tarotInterpretationAi.interpretation =
      chatCompletion.choices[0].message.content;
    tarotInterpretationAi.promptTokens = chatCompletion.usage.prompt_tokens;
    tarotInterpretationAi.completionTokens =
      chatCompletion.usage.completion_tokens;
    tarotInterpretationAi.elapsedTime = elapsedTime;
    await this.tarotInterpretationAiAccess.save(tarotInterpretationAi);
  }

  public async getTarotDaily(tarotId?: string): Promise<GetTaortDailyResponse> {
    const tartCards = await this.getAllTarotCards();
    const pickedCard = tartCards[random(tartCards.length)];
    const reversal = random(2) === 1 ? true : false;
    const pickedDaily = await this.tarotDailyAccess.find({
      where: {
        id: tarotId ? Not(tarotId) : undefined,
        cardId: pickedCard.id,
        reversal,
      },
      order: { lastReadAt: 'asc' },
    });

    if (pickedDaily.length <= 0)
      throw new InternalServerError('there is no daily tarot');

    const unreadTarot = pickedDaily.find((v) => v.lastReadAt === null);
    if (unreadTarot) {
      unreadTarot.lastReadAt = new Date().toISOString();
      await this.tarotDailyAccess.save(unreadTarot);

      return {
        ...unreadTarot,
        name: pickedCard.name,
      };
    }

    // return earliest read tarot
    pickedDaily[0].lastReadAt = new Date().toISOString();
    await this.tarotDailyAccess.save(pickedDaily[0]);

    return {
      ...pickedDaily[0],
      name: pickedCard.name,
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
      '你現在是塔羅占卜師，我會給你問題，以及我抽到的牌卡，你會給我清晰的觀點，如果抽到負面的牌卡，你會為我加油打氣，並且提供我建議，盡可能寫多一點，以唐綺陽的語氣來回答我的問題，不要自稱唐綺陽。我想問「我想問今日運勢，請給我建議跟加油打氣」我抽到「' +
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

    for (const card of data.card) {
      const tarotQuestionCard = new TarotQuestionCardEntity();
      tarotQuestionCard.questionId = newTarotQuestion.id;
      tarotQuestionCard.cardId = card.id;
      tarotQuestionCard.reversal = card.reversed;
      await this.tarotQuestionCardAccess.save(tarotQuestionCard);
    }

    return await this.tarotQuestionAccess.findOneByIdOrFail(
      newTarotQuestion.id
    );
  }

  private checkUserQuota(user: User) {
    if (user.balance < 0) throw new BadRequestError('balance is less than 0');
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
  ): Promise<GetTarotQuestionResponse> {
    return await this.tarotQuestionAccess.findOneByIdOrFail(id);
  }

  public async genNewQuestion(
    data: PostTarotQuestionRequest
  ): Promise<PostTarotQuestionResponse> {
    await this.validateSpread(data.spreadId, data.card);

    const user = await this.getUserInfo();
    this.checkUserQuota(user);

    const tarotQuestion = await this.createTarotQuestion({
      question: data.question,
      spreadId: data.spreadId,
      userId: user.id,
      card: data.card,
    });

    // await this.lambda
    //   .invoke({
    //     FunctionName: `${process.env.PROJECT}-${process.env.ENVR}-ai-agent`,
    //     Payload: JSON.stringify({
    //       id: tarotQuestion.id,
    //     }),
    //     InvocationType: 'Event',
    //   })
    //   .promise();

    return tarotQuestion;
  }

  public async getBasicInfo(): Promise<GetTarotBasicInfoResponse> {
    const tarotSpread = await this.getAllTarotSpreads();
    const tarotCard = await this.getAllTarotCards();

    return { spread: tarotSpread, card: tarotCard };
  }
}
