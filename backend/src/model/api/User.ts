import { UserBalance } from 'src/model/entity/UserBalanceEntity';
import { User } from 'src/model/entity/UserEntity';
import { Paginate, PaginationParams } from 'src/model/Pagination';

export type GetUserResponse = User;

export type GetUserTransactionParams = PaginationParams;

export type GetUserTransactionResponse = Paginate<
  Pick<
    UserBalance,
    | 'id'
    | 'transactionType'
    | 'amount'
    | 'balance'
    | 'description'
    | 'transactedAt'
  >
>;
