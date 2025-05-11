import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
import {
  UserBalance,
  UserBalanceEntity,
} from 'src/model/entity/UserBalanceEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for UserBalance model.
 */
@injectable()
export class UserBalanceAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: UserBalance) {
    const qr = await this.database.getQueryRunner();
    const entity = new UserBalanceEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }

  public async findAndCount(options?: FindManyOptions<UserBalance>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findAndCount<UserBalance>(UserBalanceEntity.name, {
      relations: {
        user: true,
      },
      ...options,
    });
  }
}
