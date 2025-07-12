import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TarotQuestion, TarotQuestionEntity } from './TarotQuestionEntity';

export type TarotReadingAi = {
  id: string;
  questionId: string;
  question: TarotQuestion;
  reading: string | null;
  promptTokens: number | null;
  completionTokens: number | null;
  elapsedTime: number | null;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'tarot_reading_ai' })
export class TarotReadingAiEntity implements TarotReadingAi {
  @Column({ primary: true, type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'char', length: 36, name: 'question_id' })
  questionId!: string;

  @ManyToOne(() => TarotQuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question!: TarotQuestion;

  @Column({ type: 'text' })
  reading: string | null = null;

  @Column({ type: 'double', name: 'prompt_tokens' })
  promptTokens: number | null = null;

  @Column({ type: 'double', name: 'completion_tokens' })
  completionTokens: number | null = null;

  @Column({ type: 'double', name: 'elapsed_time' })
  elapsedTime: number | null = null;

  @Column({ type: 'datetime', name: 'created_at', default: null })
  createdAt!: string;

  @Column({ type: 'datetime', name: 'updated_at', default: null })
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
