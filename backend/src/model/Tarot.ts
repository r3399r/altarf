export type CardDisplay = {
  id: string;
  reversed: boolean;
};

export type TarotCard = {
  id: string;
  name: string;
};

export type TarotSpread = {
  id: string;
  name: string;
  description: string;
  drawnCardCount: number;
  isAiSupport: boolean;
};

export type TarotReading = {
  id: string;
  reading: string | null;
  askedAt: string | null;
  repliedAt: string | null;
  isAi: boolean;
};

export type TarotDailyRead = {
  cardId: string;
  reversal: 0 | 1;
  earliestReadAt: string;
};
