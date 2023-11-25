import { bindings } from 'src/bindings';
import { TarotService } from 'src/logic/TarotService';
import { PostTarotRequest } from 'src/model/api/Tarot';
import { BadRequestError } from 'src/model/error';
import { LambdaEvent } from 'src/model/Lambda';

let event: LambdaEvent;
let service: TarotService;

export default async (lambdaEvent: LambdaEvent) => {
  event = lambdaEvent;
  service = bindings.get(TarotService);

  switch (event.resource) {
    case '/api/tarot':
      return await tarotDefault();
  }

  throw new BadRequestError('unexpected resource');
};

const tarotDefault = async () => {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return await service.prepareReadingCard(
        JSON.parse(event.body) as PostTarotRequest
      );
  }

  throw new Error('unexpected httpMethod');
};
