import { DbAccess } from 'src/access/DbAccess';
import { bindings } from 'src/bindings';
import { TarotTimerService } from 'src/logic/TarotTimerService';
import { initLambda } from 'src/utils/LambdaHelper';

export async function monthlyGift(_event: unknown, _context: unknown) {
  const db = bindings.get(DbAccess);
  await db.startTransaction();
  initLambda();
  const service = bindings.get(TarotTimerService);
  try {
    await service.sendMonthlyGift();
    await db.commitTransaction();
  } catch (e) {
    console.log(e);
    await db.rollbackTransaction();
  } finally {
    await db.cleanup();
  }
}
