import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tarotReaderEndpoint from 'src/api/tarotReaderEndpoint';
import { GetTarotReaderQuestionResponse } from 'src/model/backend/api/Tarot';
import { RootState } from 'src/redux/store';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const LIMIT = 10;

const useFetch = (page: number) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isReader } = useSelector((rootState: RootState) => rootState.ui);
  const [isReady, setIsReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [result, setResult] = useState<GetTarotReaderQuestionResponse>();

  const sendReading = (id: string, reading: string) => {
    dispatch(startWaiting());
    tarotReaderEndpoint
      .postTarotReaderQuestionId(id, {
        reading,
      })
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  useEffect(() => {
    if (isReader === false) navigate('/online');
    else if (isReader === true) setIsReady(true);
  }, [isReader, navigate]);

  useEffect(() => {
    if (!isReady) return;
    dispatch(startWaiting());
    const offset = (page - 1) * LIMIT;
    tarotReaderEndpoint
      .getTarotReaderQuestion({ limit: String(LIMIT), offset: String(offset) })
      .then((res) => {
        setResult(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [isReady, dispatch, refresh, page]);

  return { result, sendReading };
};

export default useFetch;
