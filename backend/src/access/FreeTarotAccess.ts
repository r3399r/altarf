import { inject, injectable } from 'inversify';
import { FindOneOptions } from 'typeorm';
import { FreeTarot, FreeTarotEntity } from 'src/model/entity/FreeTarotEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for FreeTarot model.
 */
@injectable()
export class FreeTarotAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: FreeTarot) {
    const qr = await this.database.getQueryRunner();
    const entity = new FreeTarotEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }

  public async find(options?: FindOneOptions<FreeTarot>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<FreeTarot>(FreeTarotEntity.name, {
      relations: { tarot: { user: true } },
      ...options,
    });
  }
}
