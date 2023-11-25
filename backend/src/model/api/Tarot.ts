export type PostTarotRequest = {
  description: string;
  type: string;
  card: string[];
  deviceId: string;
};

export type TarotEvent = {
  id: string;
  description: string;
};
