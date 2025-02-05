import { BeforeInsert, BeforeUpdate, Column, Entity, Generated } from 'typeorm';

export type TarotDaily = {
  id: string;
  cardId: string;
  interpretation: string;
  reversal: boolean;
  createdAt: string;
  updatedAt: string | null;
  lastReadAt: string | null;
};

@Entity({ name: 'tarot_daily' })
export class TarotDailyEntity implements TarotDaily {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text', name: 'card_id' })
  cardId!: string;

  @Column({ type: 'text' })
  interpretation!: string;

  @Column({ type: 'boolean' })
  reversal!: boolean;

  @Column({ type: 'timestamp', name: 'created_at', default: null })
  createdAt!: string;

  @Column({ type: 'timestamp', name: 'updated_at', default: null })
  updatedAt: string | null = null;

  @Column({ type: 'timestamp', name: 'last_read_at', default: null })
  lastReadAt: string | null = null;

  @BeforeInsert()
  setDateCreated(): void {
    this.createdAt = new Date().toISOString();
  }

  @BeforeUpdate()
  setDateUpdated(): void {
    this.updatedAt = new Date().toISOString();
  }
}
