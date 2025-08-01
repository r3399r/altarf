import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ECPayTradeItemEntity } from './ECPayTradeItemEntity';
import { User, UserEntity } from './UserEntity';

export type ECPayTrade = {
  id: string;
  userId: string;
  user: User;
  tradeNo: string;
  tradeDate: string;
  ecpayTradeItemId: string;
  ecpayTradeItem: ECPayTradeItemEntity;
  status: string;
  tradeAmount: string | null;
  paymentDate: string | null;
  paymentType: string | null;
  paymentTypeChargeFee: string | null;
  returnCode: string | null;
  returnMessage: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

@Entity({ name: 'ecpay_trade' })
export class ECPayTradeEntity implements ECPayTrade {
  @Column({ primary: true, type: 'char', length: 36 })
  @Generated('uuid')
  id!: string;

  @Column({ type: 'char', length: 36, name: 'user_id' })
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 255, name: 'trade_no' })
  tradeNo!: string;

  @Column({ type: 'datetime', name: 'trade_date' })
  tradeDate!: string;

  @Column({ type: 'char', length: 36, name: 'ecpay_trade_item_id' })
  ecpayTradeItemId!: string;

  @ManyToOne(() => ECPayTradeItemEntity)
  @JoinColumn({ name: 'ecpay_trade_item_id' })
  ecpayTradeItem!: ECPayTradeItemEntity;

  @Column({ type: 'varchar', length: 255 })
  status!: string;

  @Column({ type: 'int', name: 'trade_amount', nullable: true })
  tradeAmount: string | null = null;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'payment_date',
    nullable: true,
  })
  paymentDate: string | null = null;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'payment_type',
    nullable: true,
  })
  paymentType: string | null = null;

  @Column({ type: 'int', name: 'payment_type_charge_fee', nullable: true })
  paymentTypeChargeFee: string | null = null;

  @Column({ type: 'int', name: 'return_code', nullable: true })
  returnCode: string | null = null;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'return_message',
    nullable: true,
  })
  returnMessage: string | null = null;

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
