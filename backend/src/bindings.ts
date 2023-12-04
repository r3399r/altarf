import 'reflect-metadata';
import { Lambda } from 'aws-sdk';
import { Container } from 'inversify';
import { DbAccess } from './access/DbAccess';
import { FreeTarotAccess } from './access/FreeTarotAccess';
import { TarotAccess } from './access/TarotAccess';
import { UserAccess } from './access/UserAccess';
import { GoogleService } from './logic/GoogleService';
import { TarotService } from './logic/TarotService';
import { UserService } from './logic/UserService';
import { FreeTarotEntity } from './model/entity/FreeTarotEntity';
import { TarotEntity } from './model/entity/TarotEntity';
import { UserEntity } from './model/entity/UserEntity';
import { Database, dbEntitiesBindingId } from './utils/Database';

const container: Container = new Container();

container.bind(Database).toSelf().inSingletonScope();

// db entities
container.bind<Function>(dbEntitiesBindingId).toFunction(FreeTarotEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(UserEntity);
container.bind<Function>(dbEntitiesBindingId).toFunction(TarotEntity);

// db access
container.bind(DbAccess).toSelf();
container.bind(FreeTarotAccess).toSelf();
container.bind(TarotAccess).toSelf();
container.bind(UserAccess).toSelf();

// service
container.bind(GoogleService).toSelf();
container.bind(TarotService).toSelf();
container.bind(UserService).toSelf();

// AWS
container.bind(Lambda).toDynamicValue(() => new Lambda());

export { container as bindings };
