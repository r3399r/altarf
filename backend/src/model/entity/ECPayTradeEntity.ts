import { BeforeInsert, BeforeUpdate, Column, Entity, Generated } from 'typeorm';

export type ECPayTrade = {
  id: string;
  merchantTradeNo: string;
  merchantTradeDate: string;
  totalAmount: string;
  tradeDesc: string;
  itemName: string;
  status: string;
  createdAt: string;
  updatedAt: string | null;
};

@Entity('ecpay_trade')
export class ECPayTradeEntity implements ECPayTrade {
  @Column({ primary: true })
  @Generated('uuid')
  id!: string;

  @Column({ name: 'merchant_trade_no', type: 'text' })
  merchantTradeNo!: string;

  @Column({ name: 'merchant_trade_date', type: 'timestamp' })
  merchantTradeDate!: string;

  @Column({ name: 'total_amount', type: 'text' })
  totalAmount!: string;

  @Column({ name: 'trade_desc', type: 'text' })
  tradeDesc!: string;

  @Column({ name: 'item_name', type: 'text' })
  itemName!: string;

  @Column({ type: 'text' })
  status!: string;

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
