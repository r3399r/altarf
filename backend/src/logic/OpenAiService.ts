import axios from 'axios';
import { injectable } from 'inversify';
import { REQUEST_URL } from 'src/constant/OpenAi';
import { Completion, Messages } from 'src/model/ChatGPT';

/**
 * Service class for OpenAi Api
 */
@injectable()
export class OpenAiService {
  private async chatCompletion(messages: Messages): Promise<Completion> {
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

  public async askTarotQuestion(description: string, question: string) {
    console.log('description: ', description);
    console.log('question: ', question);

    return await this.chatCompletion([
      {
        role: 'developer',
        content:
          '你現在是塔羅占卜師，我會給你問題，以及我抽到的牌卡，你會給我清晰的觀點，如果抽到負面的牌卡，你會為我加油打氣，並且提供我建議，盡可能寫多一點，以唐綺陽的語氣來回答我的問題，不要自稱唐綺陽。',
      },
      {
        role: 'developer',
        content: description,
      },
      {
        role: 'user',
        content: question,
      },
    ]);
  }
}
