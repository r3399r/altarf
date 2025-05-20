import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import tarotEndpoint from 'src/api/tarotEndpoint';
import { GetTaortDailyResponse } from 'src/model/backend/api/Tarot';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const useFlow = () => {
  const dispatch = useDispatch();
  const [drawnCard, setDrawnCard] = useState<GetTaortDailyResponse>();
  const isDrawn = useMemo(() => !!drawnCard, [drawnCard]);

  const onDraw = () => {
    dispatch(startWaiting());
    tarotEndpoint
      .getTarotDaily()
      .then((res) => {
        setDrawnCard(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  return { isDrawn, drawnCard, onDraw };
};

export default useFlow;
