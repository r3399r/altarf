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
    case '/api/tarot/basic-info':
      return await tarotBasicInfo();
    case '/api/tarot/question/{id}':
      return await tarotQuestionId();
    case '/api/tarot/question/ai':
      return await tarotQuestionAi();
    case '/api/tarot/daily':
      return await tarotDaily();
  }

  throw new BadRequestError('unexpected resource');
};

const tarotBasicInfo = async () => {
  switch (event.httpMethod) {
    case 'GET':
      return await service.getBasicInfo();
  }

  throw new Error('unexpected httpMethod');
};

const tarotQuestionId = async () => {
  if (event.pathParameters === null)
    throw new BadRequestError('pathParameters should not be empty');
  switch (event.httpMethod) {
    case 'GET':
      return await service.getTarotQuestionById(event.pathParameters.id);
  }

  throw new Error('unexpected httpMethod');
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
