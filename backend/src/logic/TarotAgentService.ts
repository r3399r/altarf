import { inject, injectable } from 'inversify';
import { TarotQuestionAccess } from 'src/access/TarotQuestionAccess';
import { TarotReadingAiAccess } from 'src/access/TarotReadingAiAccess';
import { TarotEvent } from 'src/model/api/Tarot';
import { compare } from 'src/utils/compare';
import { OpenAiService } from './OpenAiService';

/**
 * Service class for TarotAgent
 */
@injectable()
export class TarotAgentService {
  @inject(OpenAiService)
  private readonly openAiService!: OpenAiService;

  @inject(TarotReadingAiAccess)
  private readonly tarotReadingAiAccess!: TarotReadingAiAccess;

  @inject(TarotQuestionAccess)
  private readonly tarotQuestionAccess!: TarotQuestionAccess;

  public async genTarotReading(data: TarotEvent) {
    const tarotReadingAi = await this.tarotReadingAiAccess.findOneByIdOrFail(
      data.id
    );
    const tarotQuestion = await this.tarotQuestionAccess.findOneByIdOrFail(
      tarotReadingAi.questionId
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

    const translateCards = tarotQuestion.card
      .sort(compare('sequence'))
      .map((v) => (v.reversal ? '逆位的' : '正位的') + v.cardId); // TODO: use true card name
    content += `我抽到${translateCards.map((v) => `「${v}」`).join('、')}`;
    console.log(content);

    const chatCompletion = await this.openAiService.chatCompletion([
      { role: 'user', content },
    ]);
    const elapsedTime = new Date().getTime() - now;

    tarotReadingAi.reading = chatCompletion.choices[0].message.content;
    tarotReadingAi.promptTokens = chatCompletion.usage.prompt_tokens;
    tarotReadingAi.completionTokens = chatCompletion.usage.completion_tokens;
    tarotReadingAi.elapsedTime = elapsedTime;
    await this.tarotReadingAiAccess.save(tarotReadingAi);
  }
}
