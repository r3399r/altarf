import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userEndpoint from 'src/api/userEndpoint';
import { GetUserTransactionResponse } from 'src/model/backend/api/User';
import { RootState } from 'src/redux/store';
import { finishWaiting, startWaiting } from 'src/redux/uiSlice';

const LIMIT = 10;

const useFetch = (page: number) => {
  const dispatch = useDispatch();
  const [result, setResult] = useState<GetUserTransactionResponse>();
  const { balance } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    dispatch(startWaiting());
    const offset = (page - 1) * LIMIT;
    userEndpoint
      .getUserTransaction({ limit: String(LIMIT), offset: String(offset) })
      .then((res) => {
        setResult(res.data);
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [dispatch, page]);

  return { result, balance };
};

export default useFetch;
