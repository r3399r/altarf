import { inject, injectable } from 'inversify';
import { FindOneOptions } from 'typeorm';
import {
  TarotInterpretationAi,
  TarotInterpretationAiEntity,
} from 'src/model/entity/TarotInterpretationAiEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for TarotInterpretationAi model.
 */
@injectable()
export class TarotInterpretationAiAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: TarotInterpretationAi) {
    const qr = await this.database.getQueryRunner();
    const entity = new TarotInterpretationAiEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }

  public async findOneOrFail(options?: FindOneOptions<TarotInterpretationAi>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneOrFail<TarotInterpretationAi>(
      TarotInterpretationAiEntity.name,
      {
        ...options,
      }
    );
  }

  public async findOneByIdOrFail(id: string) {
    return await this.findOneOrFail({ where: { id } });
  }
}
