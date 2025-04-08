import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import tarotEndpoint from 'src/api/tarotEndpoint';
import { TarotQuestion } from 'src/model/backend/entity/TarotQuestionEntity';

const useFetch = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as TarotQuestion | null;
  const intervalRef = useRef<number | null>(null);
  const [result, setResult] = useState<TarotQuestion | null>(state);

  useEffect(() => {
    if (state === null)
      tarotEndpoint.getTarotQuestionId(id ?? '').then((res) => setResult(res.data));
  }, [state, id]);

  useEffect(() => {
    if (!!result && result.interpretationAi.length > 0) return;

    const fetchData = async () => {
      const res = await tarotEndpoint.getTarotQuestionId(id ?? '');
      setResult(res.data);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    intervalRef.current = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [result, id, intervalRef]);

  return { result };
};

export default useFetch;
