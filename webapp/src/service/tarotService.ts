import tarotEndpoint from 'src/api/tarotEndpoint';

export const drawTarotDaily = async () => {
  const res = await tarotEndpoint.getTarotDaily();
  return res.data;
};
