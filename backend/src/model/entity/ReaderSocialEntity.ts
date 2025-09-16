import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Reader, ReaderEntity } from './ReaderEntity';

export type ReaderSocial = {
  id: string;
  readerId: string;
  reader: Reader;
  platform: string;
  url: string;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'reader_social' })
export class ReaderSocialEntity implements ReaderSocial {
  @Column({ primary: true, type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'char', length: 36, name: 'reader_id' })
  readerId!: string;

  @ManyToOne(() => ReaderEntity)
  @JoinColumn({ name: 'reader_id' })
  reader!: Reader;

  @Column({ type: 'varchar', length: 50 })
  platform!: string;

  @Column({ type: 'varchar', length: 255 })
  url!: string;

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
