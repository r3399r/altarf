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

export type TarotInterpretationAi = {
  id: string;
  questionId: string;
  question: TarotQuestion;
  interpretation: string | null;
  promptTokens: number | null;
  completionTokens: number | null;
  elapsedTime: number | null;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'tarot_interpretation_ai' })
export class TarotInterpretationAiEntity implements TarotInterpretationAi {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'question_id' })
  questionId!: string;

  @ManyToOne(() => TarotQuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question!: TarotQuestion;

  @Column({ type: 'text' })
  interpretation: string | null = null;

  @Column({ type: 'float8', name: 'prompt_tokens' })
  promptTokens: number | null = null;

  @Column({ type: 'float8', name: 'completion_tokens' })
  completionTokens: number | null = null;

  @Column({ type: 'float8', name: 'elapsed_time' })
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
