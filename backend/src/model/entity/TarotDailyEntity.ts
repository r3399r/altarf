import { BeforeInsert, BeforeUpdate, Column, Entity, Generated } from 'typeorm';

export type TarotDaily = {
  id: string;
  card: string;
  reading: string;
  reversal: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
};

@Entity({ name: 'tarot_daily' })
export class TarotDailyEntity implements TarotDaily {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text' })
  card!: string;

  @Column({ type: 'text' })
  reading!: string;

  @Column({ type: 'boolean' })
  reversal!: boolean;

  @Column({ type: 'boolean', name: 'is_read' })
  isRead!: boolean;

  @Column({ type: 'timestamp', name: 'created_at', default: null })
  createdAt!: string;

  @Column({ type: 'timestamp', name: 'updated_at', default: null })
  updatedAt: string | null = null;

  @Column({ type: 'timestamp', name: 'deleted_at', default: null })
  deletedAt: string | null = null;

  @BeforeInsert()
  setDateCreated(): void {
    this.createdAt = new Date().toISOString();
  }

  @BeforeUpdate()
  setDateUpdated(): void {
    this.updatedAt = new Date().toISOString();
  }
}
