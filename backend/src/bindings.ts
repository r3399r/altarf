import 'reflect-metadata';
import { Lambda, SES, SQS } from 'aws-sdk';
import { Container } from 'inversify';
import { DbAccess } from './access/DbAccess';
import { ECPayTradeAccess } from './access/ECPayTradeAccess';
import { ECPayTradeItemAccess } from './access/ECPayTradeItemAccess';
import { TarotDailyAccess } from './access/TarotDailyAccess';
import { TarotQuestionAccess } from './access/TarotQuestionAccess';
import { TarotQuestionCardAccess } from './access/TarotQuestionCardAccess';
import { TarotReadingAiAccess } from './access/TarotReadingAiAccess';
import { TarotReadingHumanAccess } from './access/TarotReadingHumanAccess';
import { UserAccess } from './access/UserAccess';
import { UserBalanceAccess } from './access/UserBalanceAccess';
import { AuthService } from './logic/AuthService';
import { ECPayService } from './logic/ECPayService';
import { GoogleService } from './logic/GoogleService';
import { OpenAiService } from './logic/OpenAiService';
import { TarotAgentService } from './logic/TarotAgentService';
import { TarotReaderService } from './logic/TarotReaderService';
import { TarotService } from './logic/TarotService';
import { TarotTimerService } from './logic/TarotTimerService';
import { UserService } from './logic/UserService';
import { ECPayTradeEntity } from './model/entity/ECPayTradeEntity';
import { ECPayTradeItemEntity } from './model/entity/ECPayTradeItemEntity';
import { TarotDailyEntity } from './model/entity/TarotDailyEntity';
import { TarotQuestionCardEntity } from './model/entity/TarotQuestionCardEntity';
import { TarotQuestionEntity } from './model/entity/TarotQuestionEntity';
import { TarotReadingAiEntity } from './model/entity/TarotReadingAiEntity';
import { TarotReadingHumanEntity } from './model/entity/TarotReadingHumanEntity';
import { UserBalanceEntity } from './model/entity/UserBalanceEntity';
import { UserEntity } from './model/entity/UserEntity';
import { Database, dbEntitiesBindingId } from './utils/Database';

const container: Container = new Container();

container.bind(Database).toSelf().inSingletonScope();

// db entities
container.bind<Function>(dbEntitiesBindingId).toFunction(ECPayTradeEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(ECPayTradeItemEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(TarotDailyEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(TarotReadingAiEntity);
container
  .bind<Function>(dbEntitiesBindingId)
  .toFunction(TarotReadingHumanEntity);
container
  .bind<Function>(dbEntitiesBindingId)
  .toFunction(TarotQuestionCardEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(TarotQuestionEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(UserEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(UserBalanceEntity);

// db access
container.bind(DbAccess).toSelf();
container.bind(ECPayTradeAccess).toSelf();
container.bind(ECPayTradeItemAccess).toSelf();
container.bind(TarotReadingAiAccess).toSelf();
container.bind(TarotReadingHumanAccess).toSelf();
container.bind(TarotDailyAccess).toSelf();
container.bind(TarotQuestionAccess).toSelf();
container.bind(TarotQuestionCardAccess).toSelf();
container.bind(UserAccess).toSelf();
container.bind(UserBalanceAccess).toSelf();

// service
container.bind(AuthService).toSelf();
container.bind(GoogleService).toSelf();
container.bind(OpenAiService).toSelf();
container.bind(TarotService).toSelf();
container.bind(TarotReaderService).toSelf();
container.bind(TarotAgentService).toSelf();
container.bind(TarotTimerService).toSelf();
container.bind(UserService).toSelf();
container.bind(ECPayService).toSelf();

// AWS
container.bind(Lambda).toDynamicValue(() => new Lambda());
container.bind(SES).toDynamicValue(() => new SES({ region: 'ap-southeast-1' }));
container.bind(SQS).toDynamicValue(() => new SQS());

export { container as bindings };
