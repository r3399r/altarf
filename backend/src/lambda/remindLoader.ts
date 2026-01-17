import { DbAccess } from 'src/access/DbAccess';
import { bindings } from 'src/bindings';
import { TarotLoaderService } from 'src/logic/TarotLoaderService';
import { initLambda } from 'src/utils/LambdaHelper';

export async function remindLoader(_event: unknown, _context: unknown) {
  const db = bindings.get(DbAccess);
  await db.startTransaction();
  initLambda();
  const service = bindings.get(TarotLoaderService);
  try {
    await service.remindUnansweredQuestions();
    await db.commitTransaction();
  } catch (e) {
    console.log(e);
    await db.rollbackTransaction();
  } finally {
    await db.cleanup();
  }
}
