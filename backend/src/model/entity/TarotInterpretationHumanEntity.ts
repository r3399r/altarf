import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { InterpretationHumanStatus } from 'src/constant/Tarot';
import { TarotQuestion, TarotQuestionEntity } from './TarotQuestionEntity';
import { User, UserEntity } from './UserEntity';

export type TarotInterpretationHuman = {
  id: string;
  questionId: string;
  question: TarotQuestion;
  readerId: string;
  reader: User;
  status: InterpretationHumanStatus;
  interpretation: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'tarot_interpretation_human' })
export class TarotInterpretationHumanEntity
  implements TarotInterpretationHuman
{
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'question_id' })
  questionId!: string;

  @ManyToOne(() => TarotQuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question!: TarotQuestion;

  @Column({ type: 'uuid', name: 'reader_id' })
  readerId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'reader_id' })
  reader!: User;

  @Column({ type: 'text' })
  status!: InterpretationHumanStatus;

  @Column({ type: 'text' })
  interpretation: string | null = null;

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
