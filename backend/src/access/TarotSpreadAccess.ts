import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
import {
  TarotSpread,
  TarotSpreadEntity,
} from 'src/model/entity/TarotSpreadEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for TarotSpread model.
 */
@injectable()
export class TarotSpreadAccess {
  @inject(Database)
  private readonly database!: Database;

  public async find(options?: FindManyOptions<TarotSpread>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<TarotSpread>(TarotSpreadEntity.name, {
      ...options,
    });
  }
}
