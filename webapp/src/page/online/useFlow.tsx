import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tarotEndpoint from 'src/api/tarotEndpoint';
import { Page } from 'src/constant/Page';
import { RootState } from 'src/redux/store';
import { clearPickedCardList, clearQuestion, setPickedCardList } from 'src/redux/tarotSlice';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';
import { randomBoolean, randomInt } from 'src/utils/random';

const useFlow = () => {
  const { cardList, pickedCardList, pickedSpread, question } = useSelector(
    (rootState: RootState) => rootState.tarot,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [id, setId] = useState<string>();

  const goToStep2 = () => setStep(2);
  const goToStep3 = () => setStep(3);

  useEffect(() => {
    if (id) navigate(`${Page.Online}/${id}`);
  }, [id]);

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
        setId(res.data.id);
        dispatch(clearQuestion());
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
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
        { ...filterdCardList[num], reversed: randomBoolean() },
      ]),
    );
  };

  return { step, goToStep2, goToStep3, onSend, onPick };
};

export default useFlow;
