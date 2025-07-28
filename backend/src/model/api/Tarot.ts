import { TarotDaily } from 'src/model/entity/TarotDailyEntity';
import { TarotQuestion } from 'src/model/entity/TarotQuestionEntity';
import { TarotReadingAi } from 'src/model/entity/TarotReadingAiEntity';
import { TarotReadingHuman } from 'src/model/entity/TarotReadingHumanEntity';
import { Paginate, PaginationParams } from 'src/model/Pagination';
import {
  CardDisplay,
  TarotCard,
  TarotReading,
  TarotSpread,
} from 'src/model/Tarot';

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
  drawnAt: string;
};

export type GetTarotBasicInfoResponse = {
  spread: TarotSpread[];
  card: TarotCard[];
};

export type GetTarotQuestionIdResponse = Omit<
  TarotQuestion,
  'readingAi' | 'readingHuman'
> & {
  reading: TarotReading[];
};

export type GetTarotQuestionParams = PaginationParams;

export type GetTarotQuestionResponse = Paginate<
  Pick<TarotQuestion, 'id' | 'question' | 'createdAt'> & {
    spread: TarotSpread;
  }
>;

export type PostTarotQuestionIdAiResponse = TarotReadingAi;

export type PostTarotQuestionIdHumanResponse = TarotReadingHuman;

export type GetTarotReaderQuestionParams = PaginationParams;

export type GetTarotReaderQuestionResponse = Paginate<TarotReadingHuman>;

export type PostTarotReaderQuestionIdRequest = {
  reading: string;
};

export type PostTarotReaderQuestionIdResponse = TarotReadingHuman;
