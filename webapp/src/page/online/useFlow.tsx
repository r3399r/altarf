import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tarotEndpoint from 'src/api/tarotEndpoint';
import { RootState } from 'src/redux/store';
import { clearPickedCardList, clearQuestion, setPickedCardList } from 'src/redux/tarotSlice';
import { finishWaiting, startWaiting } from 'src/redux/uiSlice';
import { randomBoolean, randomInt } from 'src/utils/random';

const useFlow = () => {
  const { cardList, pickedCardList, pickedSpread, question } = useSelector(
    (rootState: RootState) => rootState.tarot,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  const goToStep2 = () => setStep(2);
  const goToStep3 = () => setStep(3);

  useEffect(
    () => () => {
      dispatch(clearPickedCardList());
    },
    [dispatch],
  );

  const onSend = () => {
    if (pickedSpread === null || question === null || pickedCardList === null) return;
    dispatch(startWaiting());
    tarotEndpoint
      .postTarotQuestion({
        spreadId: pickedSpread.id,
        question,
        card: pickedCardList,
      })
      .then((res) => {
        navigate(`/online/${res.data.id}`, { state: res.data });
        dispatch(clearQuestion());
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  const onPick = () => {
    if (cardList === null) return;
    const filterdCardList = cardList.filter(
      (v) => !pickedCardList?.map((o) => o.id).includes(v.id),
    );
    const num = randomInt(0, filterdCardList.length - 1);
    dispatch(
      setPickedCardList([
        ...(pickedCardList ?? []),
        { id: filterdCardList[num].id, reversed: randomBoolean() },
      ]),
    );
  };

  return { step, goToStep2, goToStep3, onSend, onPick };
};

export default useFlow;
