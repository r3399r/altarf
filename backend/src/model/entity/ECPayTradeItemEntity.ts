import { BeforeInsert, BeforeUpdate, Column, Entity, Generated } from 'typeorm';

export type ECPayTradeItem = {
  id: string;
  name: string;
  description: string;
  amount: string;
  price: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
};

@Entity({ name: 'ecpay_trade_item' })
export class ECPayTradeItemEntity implements ECPayTradeItem {
  @Column({ primary: true, type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @Column({ type: 'int' })
  amount!: string;

  @Column({ type: 'int' })
  price!: string;

  @Column({ type: 'datetime', name: 'created_at', default: null })
  createdAt!: string;

  @Column({ type: 'datetime', name: 'updated_at', default: null })
  updatedAt: string | null = null;

  @Column({ type: 'datetime', name: 'deleted_at', default: null })
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
