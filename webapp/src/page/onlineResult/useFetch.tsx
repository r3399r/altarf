import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import tarotEndpoint from 'src/api/tarotEndpoint';
import tarotReaderEndpoint from 'src/api/tarotReaderEndpoint';
import { AI_COST } from 'src/constant/backend/Balance';
import useTarotInfo from 'src/hook/useTarotInfo';
import { GetTarotQuestionIdResponse } from 'src/model/backend/api/Tarot';
import { Reader } from 'src/model/backend/entity/ReaderEntity';
import { RootState } from 'src/redux/store';
import { finishWaiting, setBalance, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const useFetch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [result, setResult] = useState<GetTarotQuestionIdResponse>();
  const [readers, setReaders] = useState<Reader[]>();
  const { spreadList } = useTarotInfo();
  const { email, balance } = useSelector((rootState: RootState) => rootState.ui);
  const [refresh, setRefresh] = useState(false);
  const mapReaders = useMemo(() => {
    if (!result || !readers) return [];
    const askedReaderIds = result.reading.filter((r) => !r.isAi).map((r) => r.reader?.id ?? 'xx');

    return readers.filter((r) => !askedReaderIds.includes(r.id));
  }, [result, readers]);

  useEffect(() => {
    dispatch(startWaiting());
    tarotEndpoint
      .getTarotQuestionId(id ?? '')
      .then((res) => setResult(res.data))
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [id, dispatch, refresh]);

  useEffect(() => {
    dispatch(startWaiting());
    tarotReaderEndpoint
      .getTarotReader()
      .then((res) => setReaders(res.data))
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [dispatch]);

  const askAi = () => {
    dispatch(startWaiting());
    tarotEndpoint
      .postTarotQuestionIdAi(id ?? '')
      .then(() => {
        setRefresh(!refresh);
        if (balance) dispatch(setBalance(balance - AI_COST));
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  const askHuman = (readerId: string, cost: number) => {
    dispatch(startWaiting());
    tarotEndpoint
      .postTarotQuestionIdHuman(id ?? '', { readerId })
      .then(() => {
        setRefresh(!refresh);
        if (balance) dispatch(setBalance(balance - cost));
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  const doRating = (rating: number, readingId: string, isAi: boolean) => {
    dispatch(startWaiting());
    tarotEndpoint
      .postTarotQuestionIdRating(id ?? '', { rating, readingId, isAi })
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  const isAiSupport = spreadList?.find((v) => v.id === result?.spreadId)?.isAiSupport ?? false;
  const isOwner = result?.user.email === email;

  return {
    result,
    mapReaders,
    url: `${window.location.origin.toString()}${location.pathname}`,
    askAi,
    askHuman,
    isAiSupport,
    isOwner,
    doRating,
  };
};

export default useFetch;
