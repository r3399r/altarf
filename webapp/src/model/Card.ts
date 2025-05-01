import { TarotCard } from './backend/entity/TarotCardEntity';

export type PickedCard = TarotCard & {
  reversed: boolean;
};
