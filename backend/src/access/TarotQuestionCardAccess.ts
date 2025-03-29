import { inject, injectable } from 'inversify';
import {
  TarotQuestionCard,
  TarotQuestionCardEntity,
} from 'src/model/entity/TarotQuestionCardEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for TarotQuestionCard model.
 */
@injectable()
export class TarotQuestionCardAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: TarotQuestionCard) {
    const qr = await this.database.getQueryRunner();
    const entity = new TarotQuestionCardEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }
}
