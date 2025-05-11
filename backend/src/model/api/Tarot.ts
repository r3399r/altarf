import { TarotCard } from 'src/model/entity/TarotCardEntity';
import { TarotDaily } from 'src/model/entity/TarotDailyEntity';
import { TarotQuestion } from 'src/model/entity/TarotQuestionEntity';
import { TarotSpread } from 'src/model/entity/TarotSpreadEntity';
import { Paginate, PaginationParams } from 'src/model/Pagination';
import { CardDisplay } from 'src/model/Tarot';

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
  spread: TarotSpread[];
  card: TarotCard[];
};

export type GetTarotQuestionIdResponse = TarotQuestion;

export type GetTarotQuestionParams = PaginationParams;

export type GetTarotQuestionResponse = Paginate<
  Pick<TarotQuestion, 'id' | 'question' | 'spread' | 'createdAt'>
>;
