import tarotEndpoint from 'src/api/tarotEndpoint';
import { dispatch } from 'src/redux/store';
import { finishWaiting, startWaiting } from 'src/redux/uiSlice';

export const drawTarotDaily = async () => {
  try {
    dispatch(startWaiting());
    const res = await tarotEndpoint.getTarotDaily();
    return res.data;
  } finally {
    dispatch(finishWaiting());
  }
};
