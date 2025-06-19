import { bindings } from 'src/bindings';
import { TarotReaderService } from 'src/logic/TarotReaderService';
import {
  GetTarotQuestionParams,
  PostTarotReaderQuestionIdRequest,
} from 'src/model/api/Tarot';
import { BadRequestError } from 'src/model/error';
import { LambdaEvent } from 'src/model/Lambda';

let event: LambdaEvent;
let service: TarotReaderService;

export default async (lambdaEvent: LambdaEvent) => {
  event = lambdaEvent;
  service = bindings.get(TarotReaderService);

  switch (event.resource) {
    case '/api/tarot-reader/question':
      return await tarotReaderQuestion();
    case '/api/tarot-reader/question/{id}':
      return await tarotReaderQuestionId();
  }

  throw new BadRequestError('unexpected resource');
};

const tarotReaderQuestion = async () => {
  switch (event.httpMethod) {
    case 'GET':
      return await service.getQuestionListByReader(
        event.queryStringParameters as GetTarotQuestionParams | null
      );
  }

  throw new Error('unexpected httpMethod');
};

const tarotReaderQuestionId = async () => {
  if (event.pathParameters === null)
    throw new BadRequestError('pathParameters should not be empty');
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return await service.replyTarotQuestionByReader(
        event.pathParameters.id,
        JSON.parse(event.body) as PostTarotReaderQuestionIdRequest
      );
  }

  throw new Error('unexpected httpMethod');
};
