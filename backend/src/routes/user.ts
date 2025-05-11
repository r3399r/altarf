import { bindings } from 'src/bindings';
import { UserService } from 'src/logic/UserService';
import { GetUserTransactionParams } from 'src/model/api/User';
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
    case '/api/user/transaction':
      return await tarotUserTransaction();
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

const tarotUserTransaction = async () => {
  switch (event.httpMethod) {
    case 'GET':
      return await service.getUserTransactionList(
        event.queryStringParameters as GetUserTransactionParams | null
      );
  }

  throw new Error('unexpected httpMethod');
};
