import http from 'src/api/http';
import {
  GetTarotReaderQuestionParams,
  GetTarotReaderQuestionResponse,
  GetTarotReaderResponse,
  PostTarotReaderQuestionIdRequest,
  PostTarotReaderQuestionIdResponse,
} from 'src/model/backend/api/Tarot';
import { axiosError, defaultErrorMessage } from 'src/utils/errorHandler';

const getTarotReader = async () => {
  try {
    return await http.authGet<GetTarotReaderResponse>('tarot-reader');
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

const getTarotReaderQuestion = async (params: GetTarotReaderQuestionParams) => {
  try {
    return await http.authGet<GetTarotReaderQuestionResponse>('tarot-reader/question', { params });
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

const postTarotReaderQuestionId = async (id: string, data: PostTarotReaderQuestionIdRequest) => {
  try {
    return await http.authPost<PostTarotReaderQuestionIdResponse, PostTarotReaderQuestionIdRequest>(
      `tarot-reader/question/${id}`,
      { data },
    );
  } catch (e) {
    const error = axiosError(e);
    throw defaultErrorMessage(error);
  }
};

export default { getTarotReader, getTarotReaderQuestion, postTarotReaderQuestionId };
