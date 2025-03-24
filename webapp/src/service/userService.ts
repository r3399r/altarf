import userEndpoint from 'src/api/userEndpoint';
import { dispatch } from 'src/redux/store';
import { finishWaiting, startWaiting } from 'src/redux/uiSlice';

export const getUserProfile = async () => {
  try {
    dispatch(startWaiting());
    const res = await userEndpoint.getUser();
    return res.data;
  } finally {
    dispatch(finishWaiting());
  }
};
