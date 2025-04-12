import http from 'src/api/http';
import {
  GetTaortDailyResponse,
  GetTarotBasicInfoResponse,
  GetTarotQuestionResponse,
  PostTarotQuestionAiRequest,
  PostTarotQuestionAiResponse,
} from 'src/model/backend/api/Tarot';

const getTarotDaily = async () => await http.get<GetTaortDailyResponse>('tarot/daily');

const postTarotQuestionAi = async (data: PostTarotQuestionAiRequest) =>
  await http.authPost<PostTarotQuestionAiResponse, PostTarotQuestionAiRequest>(
    'tarot/question/ai',
    { data },
  );

const getTarotBasicInfo = async () => await http.get<GetTarotBasicInfoResponse>('tarot/basic-info');

const getTarotQuestionId = async (id: string) =>
  await http.get<GetTarotQuestionResponse>(`tarot/question/${id}`);

export default {
  getTarotDaily,
  postTarotQuestionAi,
  getTarotBasicInfo,
  getTarotQuestionId,
};
