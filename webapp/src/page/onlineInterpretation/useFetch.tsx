import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import tarotEndpoint from 'src/api/tarotEndpoint';
import { TarotQuestion } from 'src/model/backend/entity/TarotQuestionEntity';
import { finishWaiting, startWaiting } from 'src/redux/uiSlice';

const useFetch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as TarotQuestion | null;
  // const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState<TarotQuestion | null>(state);

  useEffect(() => {
    if (state === null) {
      dispatch(startWaiting());
      tarotEndpoint
        .getTarotQuestionId(id ?? '')
        .then((res) => setResult(res.data))
        .finally(() => {
          dispatch(finishWaiting());
        });
    }
  }, [state, id, dispatch]);

  // useEffect(() => {
  //   if (!!result && result.interpretationAi.length > 0) return;

  //   const fetchData = async () => {
  //     const res = await tarotEndpoint.getTarotQuestionId(id ?? '');
  //     setResult(res.data);
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //   };

  //   intervalRef.current = setInterval(() => {
  //     fetchData();
  //   }, 5000);

  //   return () => {
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //   };
  // }, [result, id, intervalRef]);

  return { result, url: `${window.location.origin.toString()}${location.pathname}` };
};

export default useFetch;
