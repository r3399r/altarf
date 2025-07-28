import { inject, injectable } from 'inversify';
import { FindOneOptions } from 'typeorm';
import {
  TarotReadingAi,
  TarotReadingAiEntity,
} from 'src/model/entity/TarotReadingAiEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for TarotReadingAi model.
 */
@injectable()
export class TarotReadingAiAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: TarotReadingAi) {
    const qr = await this.database.getQueryRunner();
    const entity = new TarotReadingAiEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }

  public async findOneOrFail(options?: FindOneOptions<TarotReadingAi>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneOrFail<TarotReadingAi>(
      TarotReadingAiEntity.name,
      {
        ...options,
      }
    );
  }

  public async findOneByIdOrFail(id: string) {
    return await this.findOneOrFail({ where: { id } });
  }
}
