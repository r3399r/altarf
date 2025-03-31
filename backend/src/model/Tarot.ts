import { TarotSpread } from './entity/TarotSpreadEntity';

export type Spread = TarotSpread & {
  aiSupported: boolean;
};

export type CardDisplay = {
  id: string;
  reversed: boolean;
};
