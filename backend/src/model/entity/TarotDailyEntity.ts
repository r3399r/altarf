import { BeforeInsert, BeforeUpdate, Column, Entity, Generated } from 'typeorm';

export type TarotDaily = {
  id: string;
  cardId: string;
  reading: string;
  reversal: boolean;
  createdAt: string;
  updatedAt: string | null;
  lastReadAt: string | null;
};

@Entity({ name: 'tarot_daily' })
export class TarotDailyEntity implements TarotDaily {
  @Column({ primary: true, type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, name: 'card_id' })
  cardId!: string;

  @Column({ type: 'text' })
  reading!: string;

  @Column({ type: 'boolean' })
  reversal!: boolean;

  @Column({ type: 'datetime', name: 'created_at', default: null })
  createdAt!: string;

  @Column({ type: 'datetime', name: 'updated_at', default: null })
  updatedAt: string | null = null;

  @Column({ type: 'datetime', name: 'last_read_at', default: null })
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
