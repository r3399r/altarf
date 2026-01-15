import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ReaderSocial, ReaderSocialEntity } from './ReaderSocialEntity';
import { User, UserEntity } from './UserEntity';

export type Reader = {
  id: string;
  userId: string;
  user: User;
  nickname: string;
  bio: string | null;
  social: ReaderSocial[];
  available: boolean;
  cost: number;
  fee: number;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'reader' })
export class ReaderEntity implements Reader {
  @Column({ primary: true, type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'char', length: 36, name: 'user_id' })
  userId!: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 255 })
  nickname!: string;

  @Column({ type: 'text', nullable: true })
  bio: string | null = null;

  @OneToMany(() => ReaderSocialEntity, (social) => social.reader)
  social!: ReaderSocial[];

  @Column({ type: 'boolean', default: true })
  available!: boolean;

  @Column({ type: 'double', default: 0 })
  cost!: number;

  @Column({ type: 'double', default: 0 })
  fee!: number;

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
