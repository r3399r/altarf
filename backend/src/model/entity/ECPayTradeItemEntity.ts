import { BeforeInsert, BeforeUpdate, Column, Entity, Generated } from 'typeorm';

export type ECPayTradeItem = {
  id: string;
  name: string;
  description: string;
  amount: string;
  price: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

@Entity({ name: 'ecpay_trade_item' })
export class ECPayTradeItemEntity implements ECPayTradeItem {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'int8' })
  amount!: string;

  @Column({ type: 'int8' })
  price!: string;

  @Column({ type: 'timestamp', name: 'created_at', default: null })
  createdAt!: string;

  @Column({ type: 'timestamp', name: 'updated_at', default: null })
  updatedAt: string | null = null;

  @Column({ type: 'timestamp', name: 'deleted_at', default: null })
  deletedAt: string | null = null;

  @BeforeInsert()
  setDateCreated(): void {
    this.createdAt = new Date().toISOString();
  }

  @BeforeUpdate()
  setDateUpdated(): void {
    this.updatedAt = new Date().toISOString();
  }
}
