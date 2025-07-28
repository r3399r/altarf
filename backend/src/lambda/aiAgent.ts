import { DbAccess } from 'src/access/DbAccess';
import { bindings } from 'src/bindings';
import { TarotAgentService } from 'src/logic/TarotAgentService';
import { TarotEvent } from 'src/model/api/Tarot';
import { LambdaContext } from 'src/model/Lambda';
import { errorOutput, initLambda } from 'src/utils/LambdaHelper';

export const aiAgent = async (event: TarotEvent, _context: LambdaContext) => {
  console.log(event);
  const db = bindings.get(DbAccess);
  await db.startTransaction();
  initLambda();
  try {
    const service = bindings.get(TarotAgentService);

    await service.genTarotReading(event);
    await db.commitTransaction();

    return;
  } catch (e) {
    console.log(e);
    await db.rollbackTransaction();

    return errorOutput(e);
  } finally {
    await db.cleanup();
  }
};
