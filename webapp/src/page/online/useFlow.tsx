import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearQuestion } from 'src/redux/tarotSlice';
import { finishWaiting, startWaiting } from 'src/redux/uiSlice';
import { sendTarotQuestion } from 'src/service/tarotService';

const useFlow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  const goToStep2 = () => setStep(2);
  const goToStep3 = () => setStep(3);

  const onSend = () => {
    dispatch(startWaiting());
    sendTarotQuestion()
      .then((res) => {
        navigate(`/online/${res.id}`, { state: res });
        dispatch(clearQuestion());
      })
      .finally(() => {
        dispatch(finishWaiting());
      });
  };

  return { step, goToStep2, goToStep3, onSend };
};

export default useFlow;
