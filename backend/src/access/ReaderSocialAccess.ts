import { inject, injectable } from 'inversify';
import {
  ReaderSocial,
  ReaderSocialEntity,
} from 'src/model/entity/ReaderSocialEntity';
import { Database } from 'src/utils/Database';

/**
 * Access class for ReaderSocial model.
 */
@injectable()
export class ReaderSocialAccess {
  @inject(Database)
  private readonly database!: Database;

  public async save(data: ReaderSocial) {
    const qr = await this.database.getQueryRunner();
    const entity = new ReaderSocialEntity();
    Object.assign(entity, data);

    return await qr.manager.save(entity);
  }

  public async delete(id: string) {
    const qr = await this.database.getQueryRunner();

    await qr.manager.delete<ReaderSocial>(ReaderSocialEntity.name, {
      id,
    });
  }
}
