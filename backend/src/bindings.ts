import 'reflect-metadata';
import { Lambda } from 'aws-sdk';
import { Container } from 'inversify';
import { TarotService } from './logic/TarotService';
import { UserService } from './logic/UserService';

const container: Container = new Container();

// service
container.bind(TarotService).toSelf();
container.bind(UserService).toSelf();

// AWS
container.bind(Lambda).toDynamicValue(() => new Lambda());

export { container as bindings };
