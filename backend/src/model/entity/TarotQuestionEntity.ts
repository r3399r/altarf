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
  TarotQuestionCard,
  TarotQuestionCardEntity,
} from './TarotQuestionCardEntity';
import { TarotReadingAi, TarotReadingAiEntity } from './TarotReadingAiEntity';
import {
  TarotReadingHuman,
  TarotReadingHumanEntity,
} from './TarotReadingHumanEntity';
import { User, UserEntity } from './UserEntity';

export type TarotQuestion = {
  id: string;
  question: string;
  spreadId: string;
  userId: string;
  user: User;
  card: TarotQuestionCard[];
  readingAi: TarotReadingAi[];
  readingHuman: TarotReadingHuman[];
  createdAt: string;
  updatedAt: string | null;
};

@Entity({ name: 'tarot_question' })
export class TarotQuestionEntity implements TarotQuestion {
  @Column({ primary: true, type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text' })
  question!: string;

  @Column({ type: 'varchar', length: 255, name: 'spread_id' })
  spreadId!: string;

  @Column({ type: 'char', length: 36, name: 'user_id' })
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
    () => TarotReadingAiEntity,
    (tarotReadingAi) => tarotReadingAi.question
  )
  readingAi!: TarotReadingAi[];

  @OneToMany(
    () => TarotReadingHumanEntity,
    (tarotReadingHuman) => tarotReadingHuman.question
  )
  readingHuman!: TarotReadingHuman[];

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
