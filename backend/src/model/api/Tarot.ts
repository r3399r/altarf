import { TarotCard } from 'src/model/entity/TarotCardEntity';
import { TarotDaily } from 'src/model/entity/TarotDailyEntity';
import { TarotInterpretationAi } from 'src/model/entity/TarotInterpretationAiEntity';
import { TarotInterpretationHuman } from 'src/model/entity/TarotInterpretationHumanEntity';
import { TarotQuestion } from 'src/model/entity/TarotQuestionEntity';
import { Paginate, PaginationParams } from 'src/model/Pagination';
import {
  CardDisplay,
  CustomTarotSpread,
  TarotInterpretation,
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
  spread: CustomTarotSpread[];
  card: TarotCard[];
};

export type GetTarotQuestionIdResponse = Omit<
  TarotQuestion,
  'interpretationAi'
> & {
  interpretation: TarotInterpretation[];
};

export type GetTarotQuestionParams = PaginationParams;

export type GetTarotQuestionResponse = Paginate<
  Pick<TarotQuestion, 'id' | 'question' | 'spread' | 'createdAt'>
>;

export type PostTarotQuestionIdAiResponse = TarotInterpretationAi;

export type PostTarotQuestionIdHumanResponse = TarotInterpretationHuman;
