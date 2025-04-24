import { TarotCard } from 'src/model/entity/TarotCardEntity';
import { TarotDaily } from 'src/model/entity/TarotDailyEntity';
import { TarotQuestion } from 'src/model/entity/TarotQuestionEntity';
import { CardDisplay, Spread } from 'src/model/Tarot';

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
  spread: Spread[];
  card: TarotCard[];
};

export type GetTarotQuestionResponse = TarotQuestion;
