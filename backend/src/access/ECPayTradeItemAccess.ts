import { inject, injectable } from 'inversify';
import { FindOneOptions } from 'typeorm';
import {
  ECPayTradeItem,
  ECPayTradeItemEntity,
} from 'src/model/entity/ECPayTradeItemEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for ECPayTradeItem model.
 */
@injectable()
export class ECPayTradeItemAccess {
  @inject(Database)
  private readonly database!: Database;

  public async findOneOrFail(options?: FindOneOptions<ECPayTradeItem>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneOrFail<ECPayTradeItem>(
      ECPayTradeItemEntity.name,
      {
        ...options,
      }
    );
  }

  public async findOneByIdOrFail(id: string) {
    return await this.findOneOrFail({ where: { id } });
  }
}
