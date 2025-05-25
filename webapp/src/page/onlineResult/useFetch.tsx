import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import tarotEndpoint from 'src/api/tarotEndpoint';
import useTarotInfo from 'src/hook/useTarotInfo';
import { GetTarotQuestionIdResponse } from 'src/model/backend/api/Tarot';
import { RootState } from 'src/redux/store';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const useFetch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [result, setResult] = useState<GetTarotQuestionIdResponse>();
  const { spreadList } = useTarotInfo();
  const { email } = useSelector((rootState: RootState) => rootState.ui);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
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
  }, [id, dispatch, refresh]);

  const askAi = () => {
    dispatch(startWaiting());
    tarotEndpoint
      .postTarotQuestionIdAi(id ?? '')
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

  const isAiSupport = spreadList?.find((v) => v.id === result?.spreadId)?.isAiSupport ?? false;
  const isOwner = result?.user.email === email;

  return {
    result,
    url: `${window.location.origin.toString()}${location.pathname}`,
    askAi,
    isAiSupport,
    isOwner,
  };
};

export default useFetch;
