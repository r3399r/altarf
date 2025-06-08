import { bindings } from 'src/bindings';
import { TarotReaderService } from 'src/logic/TarotReaderService';
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
  }

  throw new BadRequestError('unexpected resource');
};

const tarotReaderQuestion = async () => {
  switch (event.httpMethod) {
    case 'GET':
      return await service.getQuestionListByReader();
  }

  throw new Error('unexpected httpMethod');
};
