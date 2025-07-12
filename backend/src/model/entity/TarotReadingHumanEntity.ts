import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ReadingHumanStatus } from 'src/constant/Tarot';
import { TarotQuestion, TarotQuestionEntity } from './TarotQuestionEntity';
import { User, UserEntity } from './UserEntity';

export type TarotReadingHuman = {
  id: string;
  questionId: string;
  question: TarotQuestion;
  readerId: string;
  reader: User;
  status: ReadingHumanStatus;
  reading: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'tarot_reading_human' })
export class TarotReadingHumanEntity implements TarotReadingHuman {
  @Column({ primary: true, type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'char', length: 36, name: 'question_id' })
  questionId!: string;

  @ManyToOne(() => TarotQuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question!: TarotQuestion;

  @Column({ type: 'char', length: 36, name: 'reader_id' })
  readerId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'reader_id' })
  reader!: User;

  @Column({ type: 'varchar', length: 255 })
  status!: ReadingHumanStatus;

  @Column({ type: 'text' })
  reading: string | null = null;

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
