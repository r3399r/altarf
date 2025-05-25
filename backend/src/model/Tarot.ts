import { TarotSpread } from './entity/TarotSpreadEntity';

export type CardDisplay = {
  id: string;
  reversed: boolean;
};

export type CustomTarotSpread = TarotSpread & {
  isAiSupport: boolean;
};

export type TarotInterpretation = {
  id: string;
  interpretation: string | null;
  askedAt: string | null;
  repliedAt: string | null;
  isAi: boolean;
};
