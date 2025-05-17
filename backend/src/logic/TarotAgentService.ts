import { inject, injectable } from 'inversify';
import { TarotInterpretationAiAccess } from 'src/access/TarotInterpretationAiAccess';
import { TarotQuestionAccess } from 'src/access/TarotQuestionAccess';
import { TarotEvent } from 'src/model/api/Tarot';
import { OpenAiService } from './OpenAiService';

/**
 * Service class for TarotAgent
 */
@injectable()
export class TarotAgentService {
  @inject(OpenAiService)
  private readonly openAiService!: OpenAiService;

  @inject(TarotInterpretationAiAccess)
  private readonly tarotInterpretationAiAccess!: TarotInterpretationAiAccess;

  @inject(TarotQuestionAccess)
  private readonly tarotQuestionAccess!: TarotQuestionAccess;

  public async genTarotInterpretation(data: TarotEvent) {
    const tarotInterpretationAi =
      await this.tarotInterpretationAiAccess.findOneByIdOrFail(data.id);
    const tarotQuestion = await this.tarotQuestionAccess.findOneByIdOrFail(
      tarotInterpretationAi.questionId
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

    const translateCards = tarotQuestion.card.map(
      (v) => (v.reversal ? '逆位的' : '正位的') + v.card.name
    );
    content += `我抽到${translateCards.map((v) => `「${v}」`).join('、')}`;
    console.log(content);

    const chatCompletion = await this.openAiService.chatCompletion([
      { role: 'user', content },
    ]);
    const elapsedTime = new Date().getTime() - now;

    tarotInterpretationAi.interpretation =
      chatCompletion.choices[0].message.content;
    tarotInterpretationAi.promptTokens = chatCompletion.usage.prompt_tokens;
    tarotInterpretationAi.completionTokens =
      chatCompletion.usage.completion_tokens;
    tarotInterpretationAi.elapsedTime = elapsedTime;
    await this.tarotInterpretationAiAccess.save(tarotInterpretationAi);
  }
}
