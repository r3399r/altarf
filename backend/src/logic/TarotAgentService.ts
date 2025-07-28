import { inject, injectable } from 'inversify';
import { TarotQuestionAccess } from 'src/access/TarotQuestionAccess';
import { TarotReadingAiAccess } from 'src/access/TarotReadingAiAccess';
import { TAROT_CARD_LIST } from 'src/constant/Tarot';
import { TarotEvent } from 'src/model/api/Tarot';
import { TarotCard } from 'src/model/Tarot';
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

  private tarotCards: TarotCard[] = TAROT_CARD_LIST;

  public async genTarotReading(data: TarotEvent) {
    const tarotReadingAi = await this.tarotReadingAiAccess.findOneByIdOrFail(
      data.id
    );
    const tarotQuestion = await this.tarotQuestionAccess.findOneByIdOrFail(
      tarotReadingAi.questionId
    );

    const now = new Date().getTime();

    const translateCards = tarotQuestion.card
      .sort(compare('sequence'))
      .map(
        (v) =>
          '「' +
          (v.reversal ? '逆位的' : '正位的') +
          this.tarotCards.find((c) => c.id === v.cardId)?.name +
          '」'
      )
      .join('、');

    const description =
      tarotQuestion.spreadId === 'SINGLE'
        ? `抽到的牌卡為${translateCards}`
        : `三張牌分別代表「過去」、「現在」、「未來」，抽到的牌卡為${translateCards}`;

    const chatCompletion = await this.openAiService.askTarotQuestion(
      description,
      tarotQuestion.question
    );
    const elapsedTime = new Date().getTime() - now;

    tarotReadingAi.reading = chatCompletion.choices[0].message.content;
    tarotReadingAi.promptTokens = chatCompletion.usage.prompt_tokens;
    tarotReadingAi.completionTokens = chatCompletion.usage.completion_tokens;
    tarotReadingAi.elapsedTime = elapsedTime;
    await this.tarotReadingAiAccess.save(tarotReadingAi);
  }
}
