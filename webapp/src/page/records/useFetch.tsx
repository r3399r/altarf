import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import tarotEndpoint from 'src/api/tarotEndpoint';
import { GetTarotQuestionResponse } from 'src/model/backend/api/Tarot';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const LIMIT = 10;

const useFetch = (page: number, email: string | null) => {
  const dispatch = useDispatch();
  const [result, setResult] = useState<GetTarotQuestionResponse>();

  useEffect(() => {
    dispatch(startWaiting());
    const offset = (page - 1) * LIMIT;
    tarotEndpoint
      .getTarotQuestion({ limit: String(LIMIT), offset: String(offset), email: email ?? undefined })
      .then((res) => {
        setResult(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [dispatch, page, email]);

  return { result };
};

export default useFetch;
