import { inject, injectable } from 'inversify';
import { FindOneOptions } from 'typeorm';
import {
  TarotDaily,
  TarotDailyEntity,
} from 'src/model/entity/TarotDailyEntity';
import { TarotDailyRead } from 'src/model/Tarot';
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

  public async findOne(options?: FindOneOptions<TarotDaily>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOne<TarotDaily>(TarotDailyEntity.name, {
      ...options,
    });
  }

  private async createQueryBuilder() {
    const qr = await this.database.getQueryRunner();

    return qr.manager.createQueryBuilder(TarotDailyEntity.name, 'tarot_daily');
  }

  public async findEarliestReadList() {
    const qb = await this.createQueryBuilder();

    return await qb
      .select('tarot_daily.card_id', 'cardId')
      .addSelect('tarot_daily.reversal', 'reversal')
      .addSelect('MIN(tarot_daily.last_read_at)', 'earliestReadAt')
      .groupBy('tarot_daily.card_id')
      .addGroupBy('tarot_daily.reversal')
      .getRawMany<TarotDailyRead>();
  }
}
