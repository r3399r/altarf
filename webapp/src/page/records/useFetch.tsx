import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import tarotEndpoint from 'src/api/tarotEndpoint';
import { GetTarotQuestionResponse } from 'src/model/backend/api/Tarot';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const LIMIT = 10;

const useFetch = (page: number) => {
  const dispatch = useDispatch();
  const [result, setResult] = useState<GetTarotQuestionResponse>();

  useEffect(() => {
    dispatch(startWaiting());
    const offset = (page - 1) * LIMIT;
    tarotEndpoint
      .getTarotQuestion({ limit: String(LIMIT), offset: String(offset) })
      .then((res) => {
        setResult(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [dispatch, page]);

  return { result };
};

export default useFetch;
