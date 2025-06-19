import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {
  TarotInterpretationAi,
  TarotInterpretationAiEntity,
} from './TarotInterpretationAiEntity';
import {
  TarotInterpretationHuman,
  TarotInterpretationHumanEntity,
} from './TarotInterpretationHumanEntity';
import {
  TarotQuestionCard,
  TarotQuestionCardEntity,
} from './TarotQuestionCardEntity';
import { TarotSpread, TarotSpreadEntity } from './TarotSpreadEntity';
import { User, UserEntity } from './UserEntity';

export type TarotQuestion = {
  id: string;
  question: string;
  spreadId: string;
  spread: TarotSpread;
  userId: string;
  user: User;
  card: TarotQuestionCard[];
  interpretationAi: TarotInterpretationAi[];
  interpretationHuman: TarotInterpretationHuman[];
  createdAt: string;
  updatedAt: string | null;
};

@Entity({ name: 'tarot_question' })
export class TarotQuestionEntity implements TarotQuestion {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text' })
  question!: string;

  @Column({ type: 'text', name: 'spread_id' })
  spreadId!: string;

  @ManyToOne(() => TarotSpreadEntity)
  @JoinColumn({ name: 'spread_id' })
  spread!: TarotSpread;

  @Column({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(
    () => TarotQuestionCardEntity,
    (tarotQuestionCard) => tarotQuestionCard.question
  )
  card!: TarotQuestionCard[];

  @OneToMany(
    () => TarotInterpretationAiEntity,
    (tarotInterpretationAi) => tarotInterpretationAi.question
  )
  interpretationAi!: TarotInterpretationAi[];

  @OneToMany(
    () => TarotInterpretationHumanEntity,
    (tarotInterpretationHuman) => tarotInterpretationHuman.question
  )
  interpretationHuman!: TarotInterpretationHuman[];

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
