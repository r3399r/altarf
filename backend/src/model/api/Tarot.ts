export type PostTarotRequest = {
  spread: string;
  description: string;
  type: 'ai' | 'human';
  card: string[];
};

export type TarotEvent = {
  id: string;
};
