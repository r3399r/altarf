import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import tarotEndpoint from 'src/api/tarotEndpoint';
import { GetTaortDailyResponse } from 'src/model/backend/api/Tarot';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const useFlow = () => {
  const dispatch = useDispatch();
  const [drawnCard, setDrawnCard] = useState<GetTaortDailyResponse>();

  useEffect(() => {
    const tarotDaily = localStorage.getItem('tarotDaily');
    if (!tarotDaily) return;
    const parsed = JSON.parse(tarotDaily) as GetTaortDailyResponse;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    if (new Date(parsed.drawnAt) >= startOfDay)
      setDrawnCard(JSON.parse(tarotDaily) as GetTaortDailyResponse);
  }, []);

  const onDraw = () => {
    dispatch(startWaiting());
    tarotEndpoint
      .getTarotDaily()
      .then((res) => {
        setDrawnCard(res.data);
        localStorage.setItem('tarotDaily', JSON.stringify(res.data));
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  return { drawnCard, onDraw };
};

export default useFlow;
