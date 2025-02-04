import 'reflect-metadata';
import { Lambda, SQS } from 'aws-sdk';
import { Container } from 'inversify';
import { DbAccess } from './access/DbAccess';
import { FreeTarotAccess } from './access/FreeTarotAccess';
import { TarotAccess } from './access/TarotAccess';
import { TarotCardAccess } from './access/TarotCardAccess';
import { TarotDailyAccess } from './access/TarotDailyAccess';
import { UserAccess } from './access/UserAccess';
import { GoogleService } from './logic/GoogleService';
import { OpenAiService } from './logic/OpenAiService';
import { TarotService } from './logic/TarotService';
import { UserService } from './logic/UserService';
import { FreeTarotEntity } from './model/entity/FreeTarotEntity';
import { TarotCardEntity } from './model/entity/TarotCardEntity';
import { TarotDailyEntity } from './model/entity/TarotDailyEntity';
import { TarotEntity } from './model/entity/TarotEntity';
import { UserEntity } from './model/entity/UserEntity';
import { Database, dbEntitiesBindingId } from './utils/Database';

const container: Container = new Container();

container.bind(Database).toSelf().inSingletonScope();

// db entities
container.bind<Function>(dbEntitiesBindingId).toFunction(FreeTarotEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(TarotEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(TarotCardEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(TarotDailyEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(UserEntity);

// db access
container.bind(DbAccess).toSelf();
container.bind(FreeTarotAccess).toSelf();
container.bind(TarotAccess).toSelf();
container.bind(TarotCardAccess).toSelf();
container.bind(TarotDailyAccess).toSelf();
container.bind(UserAccess).toSelf();

// service
container.bind(GoogleService).toSelf();
container.bind(OpenAiService).toSelf();
container.bind(TarotService).toSelf();
container.bind(UserService).toSelf();

// AWS
container.bind(Lambda).toDynamicValue(() => new Lambda());
container.bind(SQS).toDynamicValue(() => new SQS());

export { container as bindings };
