import { bindings } from 'src/bindings';
import { UserService } from 'src/logic/UserService';
import { BadRequestError } from 'src/model/error';
import { LambdaEvent } from 'src/model/Lambda';

let event: LambdaEvent;
let service: UserService;

export default async (lambdaEvent: LambdaEvent) => {
  event = lambdaEvent;
  service = bindings.get(UserService);

  switch (event.resource) {
    case '/api/user':
      return await tarotUser();
  }

  throw new BadRequestError('unexpected resource');
};

const tarotUser = async () => {
  switch (event.httpMethod) {
    case 'GET':
      return await service.getUserDetail();
  }

  throw new Error('unexpected httpMethod');
};
