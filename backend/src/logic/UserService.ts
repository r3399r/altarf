import { inject, injectable } from 'inversify';
import { UserAccess } from 'src/access/UserAccess';
import { UserBalanceAccess } from 'src/access/UserBalanceAccess';
import {
  GetUserResponse,
  GetUserTransactionParams,
  GetUserTransactionResponse,
} from 'src/model/api/User';
import { LIMIT, OFFSET } from 'src/model/constant/Pagination';
import { User, UserEntity } from 'src/model/entity/UserEntity';
import { genPagination } from 'src/utils/paginator';
import { GoogleService } from './GoogleService';

/**
 * Service class for User
 */
@injectable()
export class UserService {
  @inject(UserAccess)
  private readonly userAccess!: UserAccess;

  @inject(GoogleService)
  private readonly googleService!: GoogleService;

  @inject(UserBalanceAccess)
  private readonly userBalanceAccess!: UserBalanceAccess;

  public async getUserDetail(): Promise<GetUserResponse> {
    const info = await this.googleService.getUserInfo();
    let user = await this.userAccess.findOne({
      where: { email: info.email },
    });
    if (user === null) {
      const newUser = new UserEntity();
      newUser.email = info.email;
      newUser.role = 'user';
      newUser.balance = 0;

      user = await this.userAccess.save(newUser);
    }

    return user;
  }

  public async getUserEntity(): Promise<User> {
    const info = await this.googleService.getUserInfo();

    return await this.userAccess.findOneOrFail({
      where: { email: info.email },
    });
  }

  public async getUserTransactionList(
    params: GetUserTransactionParams | null
  ): Promise<GetUserTransactionResponse> {
    const user = await this.getUserEntity();

    const limit = params?.limit ? Number(params.limit) : LIMIT;
    const offset = params?.offset ? Number(params.offset) : OFFSET;
    const [userBalance, total] = await this.userBalanceAccess.findAndCount({
      where: { userId: user.id },
      order: { transactedAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    return {
      data: userBalance.map((v) => ({
        id: v.id,
        transactionType: v.transactionType,
        amount: v.amount,
        balance: v.balance,
        description: v.description,
        transactedAt: v.transactedAt,
      })),
      paginate: genPagination(total, limit, offset),
    };
  }
}
