import { Lambda } from 'aws-sdk';
import axios from 'axios';
import { inject, injectable } from 'inversify';
import { PostTarotRequest, TarotEvent } from 'src/model/api/Tarot';

/**
 * Service class for Tarot
 */
@injectable()
export class TarotService {
  @inject(Lambda)
  private readonly lambda!: Lambda;

  public async prepareReadingCard(data: PostTarotRequest) {
    console.log(data);
    const res = await this.lambda
      .invoke({
        FunctionName: `${process.env.PROJECT}-${process.env.ENVR}-chat`,
        Payload: JSON.stringify({ id: 'abc', description: data.description }),
        InvocationType: 'Event',
      })
      .promise();

    return res;
  }

  public async readCard(data: TarotEvent) {
    const now = new Date().getTime();

    const chatCompletion = await axios.request({
      method: 'POST',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        messages: [{ role: 'user', content: data.description }],
        model: 'gpt-3.5-turbo',
      },
      headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` },
    });
    console.log(JSON.stringify(chatCompletion.data));
    console.log(new Date().getTime() - now);
  }
}
