import { DbAccess } from './access/DbAccess';
import { bindings } from './bindings';
import { TarotService } from './logic/TarotService';
import { TarotEvent } from './model/api/Tarot';
import { LambdaContext, LambdaEvent } from './model/Lambda';
import tarot from './routes/tarot';
import user from './routes/user';
import { errorOutput, initLambda, successOutput } from './utils/LambdaHelper';

export const api = async (event: LambdaEvent, _context: LambdaContext) => {
  console.log(event);

  const db = bindings.get(DbAccess);
  await db.startTransaction();
  initLambda(event);

  try {
    let res: any;

    const resource = event.resource.split('/')[2];
    switch (resource) {
      case 'tarot':
        res = await tarot(event);
        break;
      case 'user':
        res = await user(event);
        break;
    }

    const output = successOutput(res);
    await db.commitTransaction();

    return output;
  } catch (e) {
    console.log(e);
    await db.rollbackTransaction();

    return errorOutput(e);
  } finally {
    await db.cleanup();
  }
};

export const chat = async (event: TarotEvent, _context: LambdaContext) => {
  console.log(event);
  const db = bindings.get(DbAccess);
  await db.startTransaction();
  initLambda();
  try {
    const service = bindings.get(TarotService);

    await service.readCard(event);
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
