import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import tarotReaderEndpoint from 'src/api/tarotReaderEndpoint';
import { ReadingHumanStatus } from 'src/constant/backend/Tarot';
import { GetTarotReaderQuestionResponse } from 'src/model/backend/api/Tarot';
import { finishWaiting, setErrorMessage, startWaiting } from 'src/redux/uiSlice';

const LIMIT = 10;

const useFetch = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [unsolvedPage, setUnsolvedPage] = useState(1);
  const [unsolvedQuestions, setUnsolvedQuestions] = useState<GetTarotReaderQuestionResponse>();
  const [solvedPage, setSolvedPage] = useState(1);
  const [solvedQuestions, setSolvedQuestions] = useState<GetTarotReaderQuestionResponse>();

  const sendReading = (id: string, reading: string) => {
    dispatch(startWaiting());
    tarotReaderEndpoint
      .postTarotReaderQuestionId(id, {
        reading,
      })
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

  useEffect(() => {
    dispatch(startWaiting());
    const offset = (unsolvedPage - 1) * LIMIT;
    tarotReaderEndpoint
      .getTarotReaderQuestion({
        limit: String(LIMIT),
        offset: String(offset),
        status: [ReadingHumanStatus.OPEN, ReadingHumanStatus.IN_PROGRESS].join(),
      })
      .then((res) => {
        setUnsolvedQuestions(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [refresh, unsolvedPage]);

  useEffect(() => {
    dispatch(startWaiting());
    const offset = (solvedPage - 1) * LIMIT;
    tarotReaderEndpoint
      .getTarotReaderQuestion({
        limit: String(LIMIT),
        offset: String(offset),
        status: ReadingHumanStatus.DONE,
      })
      .then((res) => {
        setSolvedQuestions(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMessage(e));
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  }, [refresh, solvedPage]);

  return {
    unsolvedQuestions,
    unsolvedPage,
    setUnsolvedPage,
    solvedQuestions,
    solvedPage,
    setSolvedPage,
    sendReading,
  };
};

export default useFetch;
