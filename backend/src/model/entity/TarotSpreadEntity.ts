import { Column, Entity } from 'typeorm';

export type TarotSpread = {
  id: string;
  name: string;
  description: string;
  drawnCardCount: string;
  seqNo: string;
};

@Entity({ name: 'tarot_spread' })
export class TarotSpreadEntity implements TarotSpread {
  @Column({ primary: true })
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'int8', name: 'drawn_card_count' })
  drawnCardCount!: string;

  @Column({ type: 'int8', name: 'seq_no' })
  seqNo!: string;
}
