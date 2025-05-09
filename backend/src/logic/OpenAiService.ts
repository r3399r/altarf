import axios from 'axios';
import { injectable } from 'inversify';
import { Completion, Messages } from 'src/model/ChatGPT';
import { REQUEST_URL } from 'src/model/constant/OpenAi';

/**
 * Service class for OpenAi Api
 */
@injectable()
export class OpenAiService {
  public async chatCompletion(messages: Messages): Promise<Completion> {
    const res = await axios.request<Completion>({
      method: 'POST',
      url: REQUEST_URL,
      data: {
        messages,
        model: 'gpt-4o-mini',
      },
      headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` },
    });

    return res.data;
  }
}
