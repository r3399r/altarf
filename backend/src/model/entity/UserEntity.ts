import { BeforeInsert, BeforeUpdate, Column, Entity, Generated } from 'typeorm';

export type User = {
  id: string;
  email: string;
  role: string;
  balance: number;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'user' })
export class UserEntity implements User {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text' })
  email!: string;

  @Column({ type: 'text' })
  role!: string;

  @Column({ type: 'float8' })
  balance!: number;

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
