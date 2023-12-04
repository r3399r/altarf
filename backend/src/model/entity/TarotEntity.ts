import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User, UserEntity } from './UserEntity';

export type Tarot = {
  id: string;
  description: string;
  type: 'ai' | 'human-voice' | 'human-connect';
  spread: string;
  card: string;
  response: string | null;
  hasFile: boolean | null;
  userId: string;
  user: User;
  promptTokens: number | null;
  completionTokens: number | null;
  elapsedTime: number | null;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'tarot' })
export class TarotEntity implements Tarot {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  type!: 'ai' | 'human-voice' | 'human-connect';

  @Column({ type: 'text' })
  spread!: string;

  @Column({ type: 'text' })
  card!: string;

  @Column({ type: 'text', nullable: true })
  response: string | null = null;

  @Column({ type: 'boolean', name: 'has_file', nullable: true })
  hasFile: boolean | null = null;

  @Column({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'float8', nullable: true, name: 'prompt_tokens' })
  promptTokens: number | null = null;

  @Column({ type: 'float8', nullable: true, name: 'completion_tokens' })
  completionTokens: number | null = null;

  @Column({ type: 'float8', nullable: true, name: 'elapsed_time' })
  elapsedTime: number | null = null;

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
