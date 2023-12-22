type Spread = {
  id: string;
  name: string;
  count: number;
  description: string;
};

export const TAROT_SPREADS: Spread[] = [
  {
    id: 'SINGLE',
    name: '單張牌',
    count: 1,
    description: '簡單、快速',
  },
  {
    id: 'LINEAR',
    name: '時間之流',
    count: 3,
    description: '過去、現在、未來',
  },
];
