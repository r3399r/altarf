import { Tarot } from 'src/model/entity/TarotEntity';

export type TarotEvent = {
  id: string;
};

export type PostTarotRequest = {
  spread: string;
  description: string;
  type: 'ai' | 'human-voice' | 'human-connect';
  card: string[];
};

export type PostTarotResponse = Tarot & {
  statistics?: { avg: number | null; std: number | null };
};

export type GetTarotIdResponse = Tarot & {
  statistics?: { avg: number | null; std: number | null };
};
