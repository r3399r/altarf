import { TarotSpread } from './entity/TarotSpreadEntity';

export type CardDisplay = {
  id: string;
  reversed: boolean;
};

export type CustomTarotSpread = TarotSpread & {
  isAiSupport: boolean;
};
