import { inject, injectable } from 'inversify';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import {
  TarotQuestion,
  TarotQuestionEntity,
} from 'src/model/entity/TarotQuestionEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for TarotQuestion model.
 */
@injectable()
export class TarotQuestionAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: TarotQuestion) {
    const qr = await this.database.getQueryRunner();
    const entity = new TarotQuestionEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }

  public async findOneOrFail(options?: FindOneOptions<TarotQuestion>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneOrFail<TarotQuestion>(
      TarotQuestionEntity.name,
      {
        relations: {
          spread: true,
          user: true,
          card: { card: true },
          interpretationAi: true,
        },
        ...options,
      }
    );
  }

  public async findOneByIdOrFail(id: string) {
    return await this.findOneOrFail({ where: { id } });
  }

  public async findAndCount(options?: FindManyOptions<TarotQuestion>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findAndCount<TarotQuestion>(
      TarotQuestionEntity.name,
      {
        relations: {
          spread: true,
          user: true,
          card: { card: true },
          interpretationAi: true,
        },
        ...options,
      }
    );
  }
}
