import { TarotCard } from 'src/model/entity/TarotCardEntity';
import { TarotDaily } from 'src/model/entity/TarotDailyEntity';
import { TarotInterpretationAi } from 'src/model/entity/TarotInterpretationAiEntity';
import { TarotQuestion } from 'src/model/entity/TarotQuestionEntity';
import { Paginate, PaginationParams } from 'src/model/Pagination';
import { CardDisplay, CustomTarotSpread } from 'src/model/Tarot';

export type TarotEvent = {
  id: string;
};

export type PostTarotQuestionRequest = {
  spreadId: string;
  question: string;
  card: CardDisplay[];
};

export type PostTarotQuestionResponse = TarotQuestion;

export type GetTaortDailyResponse = TarotDaily & {
  name: string;
};

export type GetTarotBasicInfoResponse = {
  spread: CustomTarotSpread[];
  card: TarotCard[];
};

export type GetTarotQuestionIdResponse = TarotQuestion;

export type GetTarotQuestionParams = PaginationParams;

export type GetTarotQuestionResponse = Paginate<
  Pick<TarotQuestion, 'id' | 'question' | 'spread' | 'createdAt'>
>;

export type PostTarotQuestionIdAiResponse = TarotInterpretationAi;
