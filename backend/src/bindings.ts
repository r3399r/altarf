import 'reflect-metadata';
import { Lambda } from 'aws-sdk';
import { Container } from 'inversify';
import { TarotService } from './logic/TarotService';

const container: Container = new Container();

// service
container.bind(TarotService).toSelf();

// AWS
container.bind(Lambda).toDynamicValue(() => new Lambda());

export { container as bindings };
