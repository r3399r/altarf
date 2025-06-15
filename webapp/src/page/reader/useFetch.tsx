import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tarotReaderEndpoint from 'src/api/tarotReaderEndpoint';
import { GetTarotReaderQuestionResponse } from 'src/model/backend/api/Tarot';
import { RootState } from 'src/redux/store';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const useFetch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isReader } = useSelector((rootState: RootState) => rootState.ui);
  const [isReady, setIsReady] = useState(false);
  const [result, setResult] = useState<GetTarotReaderQuestionResponse>();

  useEffect(() => {
    if (isReader === false) navigate('/online');
    else if (isReader === true) setIsReady(true);
  }, [isReader, navigate]);

  useEffect(() => {
    if (!isReady) return;
    dispatch(startWaiting());
    tarotReaderEndpoint
      .getTarotReaderQuestion()
      .then((res) => {
        setResult(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [isReady, dispatch]);

  return { result };
};

export default useFetch;
