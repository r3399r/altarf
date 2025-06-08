import { inject, injectable } from 'inversify';
import { FindManyOptions } from 'typeorm';
import {
  TarotInterpretationHuman,
  TarotInterpretationHumanEntity,
} from 'src/model/entity/TarotInterpretationHumanEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for TarotInterpretationHuman model.
 */
@injectable()
export class TarotInterpretationHumanAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: TarotInterpretationHuman) {
    const qr = await this.database.getQueryRunner();
    const entity = new TarotInterpretationHumanEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }

  public async find(options?: FindManyOptions<TarotInterpretationHuman>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<TarotInterpretationHuman>(
      TarotInterpretationHumanEntity.name,
      {
        relations: {
          question: true,
          reader: true,
        },
        ...options,
      }
    );
  }
}
