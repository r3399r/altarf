import { TarotDaily } from 'src/model/entity/TarotDailyEntity';
import { TarotQuestion } from 'src/model/entity/TarotQuestionEntity';

export type TarotEvent = {
  id: string;
};

export type PostTarotQuestionAiRequest = {
  spreadId: string;
  question: string;
  card: { id: string; reversed: boolean }[];
};

export type PostTarotQuestionAiResponse = TarotQuestion;

export type GetTaortDailyResponse = TarotDaily & {
  name: string;
};
