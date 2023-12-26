export const FREE_QUOTA = 3; // per month

export enum TarotType {
  Ai = 'ai',
  HumanVoice = 'human-voice',
  HumanVideo = 'human-video',
}

type Spread = {
  id: string;
  name: string;
  count: number;
  description: string;
  typePrice: { type: TarotType; price: number }[];
};

export const TAROT_SPREADS: Spread[] = [
  {
    id: 'SINGLE',
    name: '單張牌',
    count: 1,
    description: '簡單、快速',
    typePrice: [
      {
        type: TarotType.Ai,
        price: 10,
      },
    ],
  },
  {
    id: 'LINEAR',
    name: '時間之流',
    count: 3,
    description: '過去、現在、未來',
    typePrice: [
      {
        type: TarotType.Ai,
        price: 20,
      },
      {
        type: TarotType.HumanVoice,
        price: 60,
      },
      {
        type: TarotType.HumanVideo,
        price: 150,
      },
    ],
  },
];
