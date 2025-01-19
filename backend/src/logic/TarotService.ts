import { Lambda } from 'aws-sdk';
import { addDays, isBefore } from 'date-fns';
import { inject, injectable } from 'inversify';
import { IsNull, Not } from 'typeorm';
import { FreeTarotAccess } from 'src/access/FreeTarotAccess';
import { TarotAccess } from 'src/access/TarotAccess';
import { TarotDailyAccess } from 'src/access/TarotDailyAccess';
import { UserAccess } from 'src/access/UserAccess';
import {
  GetTarotIdResponse,
  PostTarotRequest,
  PostTarotResponse,
  TarotEvent,
} from 'src/model/api/Tarot';
import { TAROT_CARDS } from 'src/model/constant/Card';
import {
  FREE_QUOTA,
  TAROT_SPREADS,
  TarotType,
} from 'src/model/constant/Spread';
import { FreeTarotEntity } from 'src/model/entity/FreeTarotEntity';
import { TarotDaily } from 'src/model/entity/TarotDailyEntity';
import { Tarot, TarotEntity } from 'src/model/entity/TarotEntity';
import { User } from 'src/model/entity/UserEntity';
import { BadRequestError, InternalServerError } from 'src/model/error';
import { random } from 'src/utils/random';
import { OpenAiService } from './OpenAiService';
import { UserService } from './UserService';

/**
 * Service class for Tarot
 */
@injectable()
export class TarotService {
  @inject(Lambda)
  private readonly lambda!: Lambda;

  @inject(OpenAiService)
  private readonly openAiService!: OpenAiService;

  @inject(TarotAccess)
  private readonly tarotAccess!: TarotAccess;

  @inject(UserService)
  private readonly userService!: UserService;

  @inject(UserAccess)
  private readonly userAccess!: UserAccess;

  @inject(FreeTarotAccess)
  private readonly freeTarotAccess!: FreeTarotAccess;

  @inject(TarotDailyAccess)
  private readonly tarotDailyAccess!: TarotDailyAccess;

  private async checkQuota(user: User, tarot: Tarot) {
    const free = await this.freeTarotAccess.find({
      where: {
        tarot: {
          userId: user.id,
        },
      },
      order: { createdAt: 'desc' },
    });

    const last = free.length > 0 ? free[0] : null;

    // free
    if (tarot.type === TarotType.Ai)
      if (
        last === null ||
        (last.createdAt &&
          isBefore(addDays(new Date(last.createdAt), 1), new Date()) &&
          free.length < FREE_QUOTA)
      ) {
        const freeTarot = new FreeTarotEntity();
        freeTarot.tarotId = tarot.id;
        await this.freeTarotAccess.save(freeTarot);

        return;
      }

    const spread = TAROT_SPREADS.find((v) => v.id === tarot.spread);
    const price = spread?.typePrice.find((v) => v.type === tarot.type)?.price;

    if (price === undefined) throw new BadRequestError('wrong input');
    if (user.balance >= price) {
      user.balance = user.balance - price;
      await this.userAccess.save(user);

      return;
    }

    let error = '';
    if (free.length >= FREE_QUOTA)
      error = `每月 ${FREE_QUOTA} 次的免費額度已用畢，`;
    else if (
      last?.createdAt &&
      !isBefore(addDays(new Date(last.createdAt), 1), new Date())
    )
      error = '每 24 小時 1 次的免費額度已用畢，';
    else error = '餘額不足，';
    throw new BadRequestError(error + '請充值以繼續');
  }

  public async prepareReadingCard(
    data: PostTarotRequest
  ): Promise<PostTarotResponse> {
    const user = await this.userService.getUserEntity();

    const tarot = new TarotEntity();
    tarot.description = data.description;
    tarot.type = data.type;
    tarot.spread = data.spread;
    tarot.card = data.card
      .map((v) => `${v.side === 'reversed' ? '-' : '+'}${v.id}`)
      .join();
    tarot.userId = user.id;
    tarot.hasFile = false;
    const newTarot = await this.tarotAccess.save(tarot);

    // check quota and save
    await this.checkQuota(user, newTarot);

    if (tarot.type === 'ai') {
      const statistics = await this.tarotAccess.findAvgAndStd();
      await this.lambda
        .invoke({
          FunctionName: `${process.env.PROJECT}-${process.env.ENVR}-invoke`,
          Payload: JSON.stringify({
            id: newTarot.id,
          }),
          InvocationType: 'Event',
        })
        .promise();

      return { ...newTarot, statistics };
    }

    return newTarot;
  }

  public async readCard(data: TarotEvent) {
    const tarot = await this.tarotAccess.findOneOrFail({
      where: { id: data.id },
    });

    const now = new Date().getTime();

    const translateCards = tarot.card
      .split(',')
      .map((v) =>
        v.startsWith('+')
          ? '正位的'
          : '逆位的' + TAROT_CARDS.find((o) => o.id === v.substring(1))?.name
      );

    let content =
      '你現在是塔羅占卜師，我會給你問題，以及我抽到的牌卡，你會給我清晰的觀點，如果抽到負面的牌卡，你會為我加油打氣，並且提供我建議，不需要另外說明，以唐綺陽的語氣來回答我的問題，不要自稱唐綺陽。';
    if (tarot.spread === TAROT_SPREADS[1].id)
      content += '三張牌分別代表「過去」、「現在」、「未來」，';
    content += `我想問「${tarot.description}」`;
    content += `我抽到${translateCards.map((v) => `「${v}」`).join('、')}`;

    const chatCompletion = await this.openAiService.chatCompletion([
      { role: 'user', content },
    ]);
    const elapsedTime = new Date().getTime() - now;

    tarot.response = chatCompletion.choices[0].message.content;
    tarot.promptTokens = chatCompletion.usage.prompt_tokens;
    tarot.completionTokens = chatCompletion.usage.completion_tokens;
    tarot.elapsedTime = elapsedTime;
    await this.tarotAccess.save(tarot);
  }

  public async getTarotById(id: string): Promise<GetTarotIdResponse> {
    const tarot = await this.tarotAccess.findOneOrFail({ where: { id } });
    if (tarot.type === 'ai' && tarot.response === null) {
      const statistics = await this.tarotAccess.findAvgAndStd();

      return { ...tarot, statistics };
    }

    return tarot;
  }

  public async getTarotDaily(tarotId?: string): Promise<TarotDaily> {
    const pickedCard = TAROT_CARDS[random(TAROT_CARDS.length)];
    const pickedDaily = await this.tarotDailyAccess.find({
      where: {
        id: tarotId ? Not(tarotId) : undefined,
        card: pickedCard.id,
        deletedAt: IsNull(),
      },
    });

    if (pickedDaily.length <= 0)
      throw new InternalServerError('no daily tarot');

    return pickedDaily[random(pickedDaily.length)];
  }
}
