import { Lambda } from 'aws-sdk';
import axios from 'axios';
import { inject, injectable } from 'inversify';
import { TarotAccess } from 'src/access/TarotAccess';
import { PostTarotRequest, TarotEvent } from 'src/model/api/Tarot';
import { Completion } from 'src/model/ChatGPT';
import { TarotEntity } from 'src/model/entity/TarotEntity';
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

  public async prepareReadingCard(data: PostTarotRequest) {
    console.log(data);

    const user = await this.userService.getUserEntity();
    console.log(user);
    const tarot = new TarotEntity();
    tarot.description = data.description;
    tarot.type = data.type;
    tarot.spread = data.spread;
    tarot.card = data.card.join();
    tarot.userId = user.id;
    const newTarot = await this.tarotAccess.save(tarot);

    if (tarot.type === 'ai')
      await this.lambda
        .invoke({
          FunctionName: `${process.env.PROJECT}-${process.env.ENVR}-chat`,
          Payload: JSON.stringify({
            id: newTarot.id,
          }),
          InvocationType: 'Event',
        })
        .promise();

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
}
