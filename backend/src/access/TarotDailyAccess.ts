import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
import {
  TarotDaily,
  TarotDailyEntity,
} from 'src/model/entity/TarotDailyEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for TarotDaily model.
 */
@injectable()
export class TarotDailyAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: TarotDaily) {
    const qr = await this.database.getQueryRunner();
    const entity = new TarotDailyEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }

  public async find(options?: FindManyOptions<TarotDaily>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<TarotDaily>(TarotDailyEntity.name, {
      ...options,
    });
  }
}
