import { TarotType } from 'src/model/constant/Spread';
import { TarotDaily } from 'src/model/entity/TarotDailyEntity';
import { Tarot } from 'src/model/entity/TarotEntity';

export type TarotEvent = {
  id: string;
};

export type PostTarotRequest = {
  spread: string;
  description: string;
  type: TarotType;
  card: { id: string; side: 'upright' | 'reversed' }[];
};

export type PostTarotResponse = Tarot & {
  statistics?: { avg: number | null; std: number | null };
};

export type GetTarotIdResponse = Tarot & {
  statistics?: { avg: number | null; std: number | null };
};

export type GetTaortDailyResponse = TarotDaily & {
  name: string;
};
