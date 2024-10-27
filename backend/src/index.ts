import { SQS } from 'aws-sdk';
import { DbAccess } from './access/DbAccess';
import { bindings } from './bindings';
import { TarotService } from './logic/TarotService';
import { TarotEvent } from './model/api/Tarot';
import { LambdaContext, LambdaEvent, LambdaOutput } from './model/Lambda';
import tarot from './routes/tarot';
import user from './routes/user';
import { errorOutput, initLambda, successOutput } from './utils/LambdaHelper';

export const api = async (event: LambdaEvent, _context: LambdaContext): Promise<LambdaOutput> => {
  console.log(event);

  const db = bindings.get(DbAccess);
  const sqs = bindings.get(SQS);

  let output: LambdaOutput;
  const startTime = Date.now();

  await db.startTransaction();
  initLambda(event);

  try {
    let res: unknown;

    const resource = event.resource.split('/')[2];
    switch (resource) {
      case 'tarot':
        res = await tarot(event);
        break;
      case 'user':
        res = await user(event);
        break;
    }

    output = successOutput(res);
    await db.commitTransaction();
  } catch (e) {
    console.error(e);
    await db.rollbackTransaction();

    output = errorOutput(e);
  } finally {
    await db.cleanup();
  }

  // logger sqs
  try {
    await sqs
      .sendMessage({
        MessageBody: JSON.stringify({
          project: process.env.PROJECT ?? '',
          resource: event.resource,
          path: event.path,
          httpMethod: event.httpMethod,
          queryStringParameters: event.queryStringParameters
            ? JSON.stringify(event.queryStringParameters)
            : null,
          body: event.body,
          elapsedTime: Date.now() - startTime,
          statusCode: output.statusCode,
          dateRequested: new Date().toISOString(),
          version: event.headers
            ? event.headers['x-api-version'] ?? null
            : null,
        }),
        QueueUrl: process.env.LOGGER_QUEUE_URL ?? '',
      })
      .promise();
  } catch (e) {
    console.error(e);
  }

  return output;
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
