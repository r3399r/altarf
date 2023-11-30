import 'reflect-metadata';
import { Lambda } from 'aws-sdk';
import { Container } from 'inversify';
import { DbAccess } from './access/DbAccess';
import { UserAccess } from './access/UserAccess';
import { TarotService } from './logic/TarotService';
import { UserService } from './logic/UserService';
import { UserEntity } from './model/entity/UserEntity';
import { Database, dbEntitiesBindingId } from './utils/Database';

const container: Container = new Container();

container.bind(Database).toSelf().inSingletonScope();

// db entities
container.bind<Function>(dbEntitiesBindingId).toFunction(UserEntity);

// db access
container.bind(DbAccess).toSelf();
container.bind(UserAccess).toSelf();

// service
container.bind(TarotService).toSelf();
container.bind(UserService).toSelf();

// AWS
container.bind(Lambda).toDynamicValue(() => new Lambda());

export { container as bindings };
