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

export type TarotQuestionCard = {
  id: string;
  questionId: string;
  question: TarotQuestion;
  reversal: boolean;
  cardId: string;
  sequence: string;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'tarot_question_card' })
export class TarotQuestionCardEntity implements TarotQuestionCard {
  @Column({ primary: true, type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'char', length: 36, name: 'question_id' })
  questionId!: string;

  @ManyToOne(() => TarotQuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question!: TarotQuestion;

  @Column({ type: 'boolean' })
  reversal!: boolean;

  @Column({ type: 'varchar', length: 255, name: 'card_id' })
  cardId!: string;

  @Column({ type: 'int' })
  sequence!: string;

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
