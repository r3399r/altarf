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
import { Reader, ReaderEntity } from './ReaderEntity';
import { TarotQuestion, TarotQuestionEntity } from './TarotQuestionEntity';

export type TarotReadingHuman = {
  id: string;
  questionId: string;
  question: TarotQuestion;
  readerId: string;
  reader: Reader;
  status: ReadingHumanStatus;
  reading: string | null;
  rating: number | null;
  viewedAt: string | null;
  repliedAt: string | null;
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

  @ManyToOne(() => ReaderEntity)
  @JoinColumn({ name: 'reader_id' })
  reader!: Reader;

  @Column({ type: 'varchar', length: 255 })
  status!: ReadingHumanStatus;

  @Column({ type: 'text' })
  reading: string | null = null;

  @Column({ type: 'int', nullable: true })
  rating: number | null = null;

  @Column({ type: 'datetime', name: 'viewed_at', default: null })
  viewedAt: string | null = null;

  @Column({ type: 'datetime', name: 'replied_at', default: null })
  repliedAt: string | null = null;

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
