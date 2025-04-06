import tarotEndpoint from 'src/api/tarotEndpoint';
import { dispatch, getState } from 'src/redux/store';
import { setCardList, setSpreadList } from 'src/redux/tarotSlice';
import { finishWaiting, startWaiting } from 'src/redux/uiSlice';
import { randomBoolean, randomIntExcept } from 'src/utils/random';

export const loadTarotBasicInfo = async () => {
  const { spreadList, cardList } = getState().tarot;
  if (spreadList !== null && cardList !== null) return;

  try {
    dispatch(startWaiting());
    const res = await tarotEndpoint.getTarotBasicInfo();
    dispatch(setSpreadList(res.data.spread));
    dispatch(setCardList(res.data.card));
  } finally {
    dispatch(finishWaiting());
  }
};

export const drawTarotDaily = async () => {
  try {
    dispatch(startWaiting());
    const res = await tarotEndpoint.getTarotDaily();
    return res.data;
  } finally {
    dispatch(finishWaiting());
  }
};

export const sendTarotQuestion = async () => {
  const { pickedSpread, question, cardList } = getState().tarot;
  if (pickedSpread === null || question === null || cardList === null)
    throw new Error('something went wrong');

  try {
    dispatch(startWaiting());

    const pickedCardNum: number[] = [];
    for (let i = 0; i < Number(pickedSpread.drawnCardCount); i++) {
      const num = randomIntExcept(0, cardList.length - 1, pickedCardNum);
      pickedCardNum.push(num);
    }

    const res = await tarotEndpoint.postTarotQuestionAi({
      spreadId: pickedSpread.id,
      question,
      card: pickedCardNum.map((v) => ({
        id: cardList[v].id,
        reversed: randomBoolean(),
      })),
    });
    return res.data;
  } finally {
    dispatch(finishWaiting());
  }
};

export const getTarotQuestionById = async (id: string) => {
  const res = await tarotEndpoint.getTarotQuestionId(id);
  return res.data;
};
