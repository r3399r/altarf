import { inject, injectable } from 'inversify';
import { FindOneOptions } from 'typeorm';
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

  public async findOneOrFail(options?: FindOneOptions<ECPayTrade>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneOrFail<ECPayTrade>(ECPayTradeEntity.name, {
      relations: {
        user: true,
        ecpayTradeItem: true,
      },
      ...options,
    });
  }

  public async findOneByIdOrFail(id: string) {
    return await this.findOneOrFail({ where: { id } });
  }

  public async save(data: ECPayTrade) {
    const qr = await this.database.getQueryRunner();
    const entity = new ECPayTradeEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }
}
