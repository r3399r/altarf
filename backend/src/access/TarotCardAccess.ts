import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
import { TarotCard, TarotCardEntity } from 'src/model/entity/TarotCardEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for TarotCard model.
 */
@injectable()
export class TarotCardAccess {
  @inject(Database)
  private readonly database!: Database;

  public async find(options?: FindManyOptions<TarotCard>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<TarotCard>(TarotCardEntity.name, {
      ...options,
    });
  }
}
