import { bindings } from 'src/bindings';
import { ECPayService } from 'src/logic/ECPayService';
import { GetECPayPaymentParams } from 'src/model/api/ECPay';
import { BadRequestError } from 'src/model/error';
import { LambdaEvent } from 'src/model/Lambda';

let event: LambdaEvent;
let service: ECPayService;

export default async (lambdaEvent: LambdaEvent) => {
  event = lambdaEvent;
  service = bindings.get(ECPayService);

  switch (event.resource) {
    case '/api/ecpay/payment':
      return await handlePayment();
    case '/api/ecpay/notify':
      return await handleNotify();
    case '/api/ecpay/items':
      return await handleItems();
  }

  throw new BadRequestError('unexpected resource');
};

const handlePayment = async () => {
  if (event.queryStringParameters === null)
    throw new BadRequestError('pathParameters should not be empty');
  switch (event.httpMethod) {
    case 'GET':
      return await service.createPayment(
        event.queryStringParameters as GetECPayPaymentParams
      );
  }

  throw new Error('unexpected httpMethod');
};

const handleNotify = async () => {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      await service.handleNotify(event.body);

      return '1|OK';
  }

  throw new Error('unexpected httpMethod');
};

const handleItems = async () => {
  switch (event.httpMethod) {
    case 'GET':
      return await service.getItems();
  }

  throw new Error('unexpected httpMethod');
};
