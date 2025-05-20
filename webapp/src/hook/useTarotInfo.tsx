import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tarotEndpoint from 'src/api/tarotEndpoint';
import { RootState } from 'src/redux/store';
import { setCardList, setSpreadList } from 'src/redux/tarotSlice';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const useTarotInfo = () => {
  const dispatch = useDispatch();
  const { spreadList, cardList } = useSelector((rootState: RootState) => rootState.tarot);

  useEffect(() => {
    if (spreadList !== null && cardList !== null) return;

    dispatch(startWaiting());
    tarotEndpoint
      .getTarotBasicInfo()
      .then((res) => {
        dispatch(setSpreadList(res.data.spread));
        dispatch(setCardList(res.data.card));
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [spreadList, cardList, dispatch]);

  return { spreadList, cardList };
};

export default useTarotInfo;
