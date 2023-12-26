import { Tarot } from 'src/model/entity/TarotEntity';
import { TarotType } from 'src/model/constant/Spread';

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
