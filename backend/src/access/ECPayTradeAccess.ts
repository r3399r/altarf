import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
import {
  ECPayTrade,
  ECPayTradeEntity,
} from 'src/model/entity/ECPayTradeEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for ECPayTrade model.
 */
@injectable()
export class ECPayTradeAccess {
  @inject(Database)
  private readonly database!: Database;

  public async find(options?: FindManyOptions<ECPayTrade>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<ECPayTrade>(ECPayTradeEntity.name, {
      ...options,
    });
  }
}
