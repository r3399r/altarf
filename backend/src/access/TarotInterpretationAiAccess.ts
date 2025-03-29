import { inject, injectable } from 'inversify';
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
}
