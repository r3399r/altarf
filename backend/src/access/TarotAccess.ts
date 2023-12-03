import { inject, injectable } from 'inversify';
import { FindOneOptions } from 'typeorm';
import { Tarot, TarotEntity } from 'src/model/entity/TarotEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for Tarot model.
 */
@injectable()
export class TarotAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: Tarot) {
    const qr = await this.database.getQueryRunner();
    const entity = new TarotEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }

  public async findOneOrFail(options?: FindOneOptions<Tarot>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneOrFail<Tarot>(TarotEntity.name, {
      relations: { user: true },
      ...options,
    });
  }
}
