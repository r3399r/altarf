import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TarotCard, TarotCardEntity } from './TarotCardEntity';
import { TarotQuestion, TarotQuestionEntity } from './TarotQuestionEntity';

export type TarotQuestionCard = {
  id: string;
  questionId: string;
  question: TarotQuestion;
  reversal: boolean;
  cardId: string;
  card: TarotCard;
  sequence: string;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'tarot_question_card' })
export class TarotQuestionCardEntity implements TarotQuestionCard {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'question_id' })
  questionId!: string;

  @ManyToOne(() => TarotQuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question!: TarotQuestion;

  @Column({ type: 'boolean' })
  reversal!: boolean;

  @Column({ type: 'text', name: 'card_id' })
  cardId!: string;

  @ManyToOne(() => TarotCardEntity)
  @JoinColumn({ name: 'card_id' })
  card!: TarotCard;

  @Column({ type: 'int8' })
  sequence!: string;

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
