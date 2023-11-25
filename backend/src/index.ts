import { bindings } from './bindings';
import { TarotService } from './logic/TarotService';
import { TarotEvent } from './model/api/Tarot';
import { LambdaContext, LambdaEvent } from './model/Lambda';
import tarot from './routes/tarot';
import { errorOutput, successOutput } from './utils/LambdaHelper';

export const api = async (event: LambdaEvent, _context: LambdaContext) => {
  console.log(event);

  try {
    let res: any;

    const resource = event.resource.split('/')[2];
    switch (resource) {
      case 'tarot':
        res = await tarot(event);
        break;
    }

    const output = successOutput(res);

    return output;
  } catch (e) {
    return errorOutput(e);
  }
};

export const chat = async (event: TarotEvent, _context: LambdaContext) => {
  const service = bindings.get(TarotService);

  await service.readCard(event);
};
