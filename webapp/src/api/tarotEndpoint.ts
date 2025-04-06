import {
  GetTaortDailyResponse,
  GetTarotBasicInfoResponse,
  GetTarotQuestionResponse,
  PostTarotQuestionAiRequest,
  PostTarotQuestionAiResponse,
} from 'src/model/backend/api/Tarot';
import http from 'src/api/http';

const getTarotDaily = async () => {
  return await http.get<GetTaortDailyResponse>('tarot/daily');
};

const postTarotQuestionAi = async (data: PostTarotQuestionAiRequest) => {
  return await http.authPost<PostTarotQuestionAiResponse, PostTarotQuestionAiRequest>(
    'tarot/question/ai',
    { data },
  );
};

const getTarotBasicInfo = async () => {
  return await http.get<GetTarotBasicInfoResponse>('tarot/basic-info');
};

const getTarotQuestionId = async (id: string) => {
  return await http.get<GetTarotQuestionResponse>(`tarot/question/${id}`);
};

export default {
  getTarotDaily,
  postTarotQuestionAi,
  getTarotBasicInfo,
  getTarotQuestionId,
};
