import { Lambda } from 'aws-sdk';
import axios from 'axios';
import { addDays, isBefore } from 'date-fns';
import { inject, injectable } from 'inversify';
import { FreeTarotAccess } from 'src/access/FreeTarotAccess';
import { TarotAccess } from 'src/access/TarotAccess';
import { UserAccess } from 'src/access/UserAccess';
import {
  GetTarotIdResponse,
  PostTarotRequest,
  PostTarotResponse,
  TarotEvent,
} from 'src/model/api/Tarot';
import { Completion } from 'src/model/ChatGPT';
import { Cost, QUOTA } from 'src/model/constant';
import { FreeTarotEntity } from 'src/model/entity/FreeTarotEntity';
import { Tarot, TarotEntity } from 'src/model/entity/TarotEntity';
import { User } from 'src/model/entity/UserEntity';
import { BadRequestError } from 'src/model/error';
import { UserService } from './UserService';

/**
 * Service class for Tarot
 */
@injectable()
export class TarotService {
  @inject(Lambda)
  private readonly lambda!: Lambda;

  @inject(TarotAccess)
  private readonly tarotAccess!: TarotAccess;

  @inject(UserService)
  private readonly userService!: UserService;

  @inject(UserAccess)
  private readonly userAccess!: UserAccess;

  @inject(FreeTarotAccess)
  private readonly freeTarotAccess!: FreeTarotAccess;

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
    if (tarot.type === 'ai')
      if (
        last === null ||
        (last.createdAt &&
          isBefore(addDays(new Date(last.createdAt), 1), new Date()) &&
          free.length < QUOTA)
      ) {
        const freeTarot = new FreeTarotEntity();
        freeTarot.tarotId = tarot.id;
        await this.freeTarotAccess.save(freeTarot);

        return;
      }
    let cost = 0;
    if (tarot.type === 'ai') cost = Cost.Ai;
    else if (tarot.type === 'human-voice') cost = Cost.HumanVoice;
    else if (tarot.type === 'human-connect') cost = Cost.HumanConnect;
    if (user.balance >= cost) {
      user.balance = user.balance - cost;
      await this.userAccess.save(user);

      return;
    }

    let error = '';
    if (free.length >= QUOTA) error = `每月 ${QUOTA} 次的免費額度已用畢，`;
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
    tarot.card = data.card.join();
    tarot.userId = user.id;
    const newTarot = await this.tarotAccess.save(tarot);

    // check quota and save
    await this.checkQuota(user, newTarot);

    if (tarot.type === 'ai') {
      const statistics = await this.tarotAccess.findAvgAndStd();
      await this.lambda
        .invoke({
          FunctionName: `${process.env.PROJECT}-${process.env.ENVR}-chat`,
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

    let content =
      '你現在是塔羅占卜師，我會給你問題，以及我抽到的牌卡，你會給我清晰的觀點，如果抽到負面的牌卡，你會為我加油打氣，並且提供我建議，不需要另外說明，以唐綺陽的語氣來回答我的問題。';
    if (tarot.spread === '時間之流')
      content += '三張牌分別代表「過去」、「現在」、「未來」，';
    content += `我想問「${tarot.description}」`;
    content += `我抽到${tarot.card
      .split(',')
      .map((v) => `「${v}」`)
      .join('、')}`;

    const res = await axios.request<Completion>({
      method: 'POST',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        messages: [{ role: 'user', content }],
        model: 'gpt-3.5-turbo',
      },
      headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` },
    });
    const chatCompletion = res.data;
    const elapsedTime = new Date().getTime() - now;

    tarot.response = chatCompletion.choices[0].message.content;
    tarot.hasFile = false;
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
}
