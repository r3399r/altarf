import tarotEndpoint from 'src/api/tarotEndpoint';
import { getState } from 'src/redux/store';
import { randomBoolean, randomIntExcept } from 'src/utils/random';

export const sendTarotQuestion = async () => {
  const { pickedSpread, question, cardList } = getState().tarot;
  if (pickedSpread === null || question === null || cardList === null)
    throw new Error('something went wrong');

  const pickedCardNum: number[] = [];
  for (let i = 0; i < Number(pickedSpread.drawnCardCount); i++) {
    const num = randomIntExcept(0, cardList.length - 1, pickedCardNum);
    pickedCardNum.push(num);
  }

  const res = await tarotEndpoint.postTarotQuestion({
    spreadId: pickedSpread.id,
    question,
    card: pickedCardNum.map((v) => ({
      id: cardList[v].id,
      reversed: randomBoolean(),
    })),
  });

  return res.data;
};
