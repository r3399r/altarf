import http from 'src/api/http';
import {
  GetTarotReaderQuestionResponse,
  PostTarotReaderQuestionIdRequest,
  PostTarotReaderQuestionIdResponse,
} from 'src/model/backend/api/Tarot';
import { axiosError, defaultErrorMessage } from 'src/utils/errorHandler';

const getTarotReaderQuestion = async () => {
  try {
    return await http.authGet<GetTarotReaderQuestionResponse>('tarot-reader/question');
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

const postTarotReaderQuestionId = async (id: string, params: PostTarotReaderQuestionIdRequest) => {
  try {
    return await http.authPost<PostTarotReaderQuestionIdResponse, PostTarotReaderQuestionIdRequest>(
      `tarot-reader/question/${id}`,
      { params },
    );
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

export default {
  getTarotReaderQuestion,
  postTarotReaderQuestionId,
};
