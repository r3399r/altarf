import { DbAccess } from 'src/access/DbAccess';
import { bindings } from 'src/bindings';
import { TarotService } from 'src/logic/TarotService';
import { initLambda } from 'src/utils/LambdaHelper';

export const tarotDaily = async () => {
  const db = bindings.get(DbAccess);
  initLambda();
  const tarotService = bindings.get(TarotService);
  await db.startTransaction();

  try {
    await tarotService.generateTarotDaily();
    await db.commitTransaction();
  } catch (e) {
    console.error(e);
    await db.rollbackTransaction();
  } finally {
    await db.cleanup();
  }
};
