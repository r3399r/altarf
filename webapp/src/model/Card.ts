import { TarotCard } from './backend/Tarot';

export type PickedCard = TarotCard & {
  reversed: boolean;
};
