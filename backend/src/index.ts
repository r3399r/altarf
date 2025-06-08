import { SQS } from 'aws-sdk';
import { DbAccess } from './access/DbAccess';
import { bindings } from './bindings';
import { TarotAgentService } from './logic/TarotAgentService';
import { TarotService } from './logic/TarotService';
import { TarotEvent } from './model/api/Tarot';
import { GatewayTimeoutError } from './model/error/5XX/GatewayTimeoutError';
import { LambdaContext, LambdaEvent, LambdaOutput } from './model/Lambda';
import auth from './routes/auth';
import ecpay from './routes/ecpay';
import tarot from './routes/tarot';
import tarotReader from './routes/tarotReader';
import user from './routes/user';
import { errorOutput, initLambda, successOutput } from './utils/LambdaHelper';

const apiProcess = async (event: LambdaEvent): Promise<LambdaOutput> => {
  const db = bindings.get(DbAccess);
  let output: LambdaOutput;
  await db.startTransaction();
  initLambda(event);

  try {
    let res: unknown;

    const resource = event.resource.split('/')[2];
    switch (resource) {
      case 'auth':
        res = await auth(event);
        break;
      case 'tarot':
        res = await tarot(event);
        break;
      case 'tarot-reader':
        res = await tarotReader(event);
        break;
      case 'user':
        res = await user(event);
        break;
      case 'ecpay':
        res = await ecpay(event);
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

  return output;
};

export const api = async (
  event: LambdaEvent,
  context: LambdaContext
): Promise<LambdaOutput> => {
  console.log(event);

  const startTime = Date.now();

  const output = await Promise.race([
    apiProcess(event),
    new Promise<LambdaOutput>((resolve) =>
      setTimeout(
        () => resolve(errorOutput(new GatewayTimeoutError('Gateway Timeout'))),
        context.getRemainingTimeInMillis() - 2000
      )
    ),
  ]);

  // logger sqs
  const sqs = bindings.get(SQS);
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
          ip: event.requestContext.identity.sourceIp,
        }),
        QueueUrl: process.env.LOGGER_QUEUE_URL ?? '',
      })
      .promise();
  } catch (e) {
    console.error(e);
  }

  return output;
};

export const aiAgent = async (event: TarotEvent, _context: LambdaContext) => {
  console.log(event);
  const db = bindings.get(DbAccess);
  await db.startTransaction();
  initLambda();
  try {
    const service = bindings.get(TarotAgentService);

    await service.genTarotInterpretation(event);
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
