import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Tarot, TarotEntity } from './TarotEntity';

export type FreeTarot = {
  id: string;
  tarotId: string;
  tarot: Tarot;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'free_tarot' })
export class FreeTarotEntity implements FreeTarot {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'tarot_id' })
  tarotId!: string;

  @ManyToOne(() => TarotEntity)
  @JoinColumn({ name: 'tarot_id' })
  tarot!: Tarot;

  @Column({ type: 'timestamp', name: 'created_at', default: null })
  createdAt!: string;

  @Column({ type: 'timestamp', name: 'updated_at', default: null })
  updatedAt: string | null = null;

  @BeforeInsert()
  setDateCreated(): void {
    this.createdAt = new Date().toISOString();
  }

  @BeforeUpdate()
  setDateUpdated(): void {
    this.updatedAt = new Date().toISOString();
  }
}
