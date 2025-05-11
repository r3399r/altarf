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

export type UserBalance = {
  id: string;
  userId: string;
  user: User;
  transactionType: string;
  amount: number;
  balance: number;
  description: string | null;
  transactedAt: string;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'user_balance' })
export class UserBalanceEntity implements UserBalance {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'text', name: 'transaction_type' })
  transactionType!: string;

  @Column({ type: 'float8' })
  amount!: number;

  @Column({ type: 'float8' })
  balance!: number;

  @Column({ type: 'text', nullable: true })
  description: string | null = null;

  @Column({ type: 'timestamp', name: 'transacted_at' })
  transactedAt!: string;

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
