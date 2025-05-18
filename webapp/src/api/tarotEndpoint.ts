import http from 'src/api/http';
import {
  GetTaortDailyResponse,
  GetTarotBasicInfoResponse,
  GetTarotQuestionIdResponse,
  GetTarotQuestionParams,
  GetTarotQuestionResponse,
  PostTarotQuestionRequest,
  PostTarotQuestionResponse,
} from 'src/model/backend/api/Tarot';

const getTarotDaily = async () => await http.get<GetTaortDailyResponse>('tarot/daily');

const postTarotQuestion = async (data: PostTarotQuestionRequest) =>
  await http.authPost<PostTarotQuestionResponse, PostTarotQuestionRequest>('tarot/question', {
    data,
  });

const getTarotBasicInfo = async () => await http.get<GetTarotBasicInfoResponse>('tarot/basic-info');

const getTarotQuestion = async (params: GetTarotQuestionParams) =>
  await http.authGet<GetTarotQuestionResponse, GetTarotQuestionParams>('tarot/question', {
    params,
  });

const getTarotQuestionId = async (id: string) =>
  await http.get<GetTarotQuestionIdResponse>(`tarot/question/${id}`);

export default {
  getTarotDaily,
  postTarotQuestion,
  getTarotBasicInfo,
  getTarotQuestion,
  getTarotQuestionId,
};
