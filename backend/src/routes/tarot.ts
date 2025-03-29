import { bindings } from 'src/bindings';
import { TarotService } from 'src/logic/TarotService';
import { PostTarotQuestionAiRequest } from 'src/model/api/Tarot';
import { BadRequestError } from 'src/model/error';
import { LambdaEvent } from 'src/model/Lambda';

let event: LambdaEvent;
let service: TarotService;

export default async (lambdaEvent: LambdaEvent) => {
  event = lambdaEvent;
  service = bindings.get(TarotService);

  switch (event.resource) {
    case '/api/tarot/question/ai':
      return await tarotQuestionAi();
    case '/api/tarot/daily':
      return await tarotDaily();
  }

  throw new BadRequestError('unexpected resource');
};

const tarotQuestionAi = async () => {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return await service.askQuestionToAi(
        JSON.parse(event.body) as PostTarotQuestionAiRequest
      );
  }

  throw new Error('unexpected httpMethod');
};

const tarotDaily = async () => {
  switch (event.httpMethod) {
    case 'GET':
      return await service.getTarotDaily(event.queryStringParameters?.tarotId);
  }

  throw new Error('unexpected httpMethod');
};
