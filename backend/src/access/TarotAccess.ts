import { inject, injectable } from 'inversify';
import { FindOneOptions } from 'typeorm';
import { Tarot, TarotEntity } from 'src/model/entity/TarotEntity';
import { InternalServerError } from 'src/model/error';
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

  public async findAvgAndStd() {
    const qr = await this.database.getQueryRunner();
    const queryBuilder = qr.manager
      .createQueryBuilder(TarotEntity.name, 't')
      .select('avg(t.elapsed_time)', 'avg')
      .addSelect('stddev_pop(t.elapsed_time)', 'std')
      .where('t.elapsed_time is not null');

    const res = await queryBuilder.getRawOne<{
      avg: number | null;
      std: number | null;
    }>();
    if (res === undefined) throw new InternalServerError('unexpected db issue');

    return res;
  }
}
