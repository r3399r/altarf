import { Column, Entity } from 'typeorm';

export type TarotCard = {
  id: string;
  name: string;
};

@Entity({ name: 'tarot_card' })
export class TarotCardEntity implements TarotCard {
  @Column({ primary: true })
  id!: string;

  @Column({ type: 'text' })
  name!: string;
}
