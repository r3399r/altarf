import { inject, injectable } from 'inversify';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import {
  TarotReadingHuman,
  TarotReadingHumanEntity,
} from 'src/model/entity/TarotReadingHumanEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for TarotReadingHuman model.
 */
@injectable()
export class TarotReadingHumanAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: TarotReadingHuman) {
    const qr = await this.database.getQueryRunner();
    const entity = new TarotReadingHumanEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }

  public async findAndCount(options?: FindManyOptions<TarotReadingHuman>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findAndCount<TarotReadingHuman>(
      TarotReadingHumanEntity.name,
      {
        relations: {
          question: {
            spread: true,
            card: { card: true },
          },
          reader: true,
        },
        ...options,
      }
    );
  }

  public async findOne(options?: FindOneOptions<TarotReadingHuman>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOne<TarotReadingHuman>(
      TarotReadingHumanEntity.name,
      {
        relations: {
          question: true,
          reader: true,
        },
        ...options,
      }
    );
  }

  public async findOneOrFail(options?: FindOneOptions<TarotReadingHuman>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneOrFail<TarotReadingHuman>(
      TarotReadingHumanEntity.name,
      {
        relations: {
          question: { user: true },
          reader: true,
        },
        ...options,
      }
    );
  }
}
