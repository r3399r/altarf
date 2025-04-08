import tarotEndpoint from 'src/api/tarotEndpoint';
import { TarotCard } from 'src/model/backend/entity/TarotCardEntity';
import { Spread } from 'src/model/backend/Tarot';
import { randomBoolean, randomIntExcept } from 'src/utils/random';

export const sendTarotQuestion = async (
  pickedSpread: Spread,
  cardList: TarotCard[],
  question: string,
) => {
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
};
