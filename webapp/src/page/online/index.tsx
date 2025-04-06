import { useState } from 'react';
import Step1Agree from './Step1Agree';
import Step2Ask from './Step2Ask';
import Step3Pick from './Step3Pick';
import { sendTarotQuestion } from 'src/service/tarotService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearQuestion } from 'src/redux/tarotSlice';

const Online = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  const onSend = () => {
    sendTarotQuestion().then((res) => {
      navigate(`/online/${res.id}`, { state: res });
      dispatch(clearQuestion());
    });
  };

  return (
    <div className="mt-10 mb-[80px] sm:mt-[80px]">
      {step === 1 && <Step1Agree onNext={() => setStep(2)} />}
      {step === 2 && <Step2Ask onNext={() => setStep(3)} />}
      {step === 3 && <Step3Pick onSend={onSend} />}
    </div>
  );
};

export default Online;
