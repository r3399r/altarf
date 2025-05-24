import http from 'src/api/http';
import {
  GetTaortDailyResponse,
  GetTarotBasicInfoResponse,
  GetTarotQuestionIdResponse,
  GetTarotQuestionParams,
  GetTarotQuestionResponse,
  PostTarotQuestionIdAiResponse,
  PostTarotQuestionRequest,
  PostTarotQuestionResponse,
} from 'src/model/backend/api/Tarot';
import { axiosError, defaultErrorMessage } from 'src/utils/errorHandler';

const getTarotDaily = async () => {
  try {
    return await http.get<GetTaortDailyResponse>('tarot/daily');
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

const postTarotQuestion = async (data: PostTarotQuestionRequest) => {
  try {
    return await http.authPost<PostTarotQuestionResponse, PostTarotQuestionRequest>(
      'tarot/question',
      {
        data,
      },
    );
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

const getTarotBasicInfo = async () => {
  try {
    return await http.get<GetTarotBasicInfoResponse>('tarot/basic-info');
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

const getTarotQuestion = async (params: GetTarotQuestionParams) => {
  try {
    return await http.authGet<GetTarotQuestionResponse, GetTarotQuestionParams>('tarot/question', {
      params,
    });
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

const getTarotQuestionId = async (id: string) => {
  try {
    return await http.get<GetTarotQuestionIdResponse>(`tarot/question/${id}`);
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

const postTarotQuestionIdAi = async (id: string) => {
  try {
    return await http.authPost<PostTarotQuestionIdAiResponse>(`tarot/question/${id}/ai`);
  } catch (e) {
    const error = axiosError(e);
    if (error.response?.data.code === 'BALANCE_INSUFFICIENT') throw '餘額不足，請先儲值';
    if (error.response?.data.code === 'SPREAD_NOT_SUPPORT_AI') throw '此牌陣不支援 AI 解牌';

    throw defaultErrorMessage(error);
  }
};

export default {
  getTarotDaily,
  postTarotQuestion,
  getTarotBasicInfo,
  getTarotQuestion,
  getTarotQuestionId,
  postTarotQuestionIdAi,
};
