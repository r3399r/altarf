import axios from 'axios';
import { injectable } from 'inversify';
import { Completion, Messages } from 'src/model/ChatGPT';
import { Model, REQUEST_URL } from 'src/model/constant/OpenAi';

/**
 * Service class for OpenAi Api
 */
@injectable()
export class OpenAiService {
  public async chatCompletion(
    messages: Messages,
    model = Model.GPT_4O_MINI
  ): Promise<Completion> {
    const res = await axios.request<Completion>({
      method: 'POST',
      url: REQUEST_URL,
      data: {
        messages,
        model,
      },
      headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` },
    });

    return res.data;
  }
}
