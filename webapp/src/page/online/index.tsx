import { useState } from 'react';
import Step1Agree from './Step1Agree';
import Step2Ask from './Step2Ask';
import Step3Pick from './Step3Pick';
import Step4Interpretation from './Step4Interpretation';
import { sendTarotQuestion } from 'src/service/tarotService';
import { useNavigate } from 'react-router-dom';

const Online = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  const onSend = () => {
    sendTarotQuestion().then((res) => {
      navigate(`/online/${res.id}`);
    });
  };

  return (
    <div className="mt-10 mb-[80px] sm:mt-[80px]">
      {step === 1 && <Step1Agree onNext={() => setStep(2)} />}
      {step === 2 && <Step2Ask onNext={() => setStep(3)} />}
      {step === 3 && <Step3Pick onSend={onSend} />}
      {step === 4 && <Step4Interpretation />}
    </div>
  );
};

export default Online;
