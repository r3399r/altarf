import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import tarotEndpoint from 'src/api/tarotEndpoint';
import { TarotQuestion } from 'src/model/backend/entity/TarotQuestionEntity';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const useFetch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as TarotQuestion | null;
  const [result, setResult] = useState<TarotQuestion | null>(state);

  useEffect(() => {
    if (state === null) {
      dispatch(startWaiting());
      tarotEndpoint
        .getTarotQuestionId(id ?? '')
        .then((res) => setResult(res.data))
        .catch((e) => {
          dispatch(setErrorMessage(e));
        })
        .finally(() => {
          dispatch(finishWaiting());
        });
    }
  }, [state, id, dispatch]);

  const askAi = () => {
    dispatch(startWaiting());
    tarotEndpoint
      .postTarotQuestionIdAi(id ?? '')
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  return { result, url: `${window.location.origin.toString()}${location.pathname}`, askAi };
};

export default useFetch;
