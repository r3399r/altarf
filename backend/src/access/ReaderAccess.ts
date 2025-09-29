import { inject, injectable } from 'inversify';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { Reader, ReaderEntity } from 'src/model/entity/ReaderEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for Reader model.
 */
@injectable()
export class ReaderAccess {
  @inject(Database)
  private readonly database!: Database;

  public async find(options?: FindManyOptions<Reader>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.find<Reader>(ReaderEntity.name, {
      relations: {
        user: true,
        social: true,
      },
      ...options,
    });
  }

  public async findOneOrFail(options?: FindOneOptions<Reader>) {
    const qr = await this.database.getQueryRunner();

    return await qr.manager.findOneOrFail<Reader>(ReaderEntity.name, {
      relations: {
        user: true,
        social: true,
      },
      ...options,
    });
  }
}
