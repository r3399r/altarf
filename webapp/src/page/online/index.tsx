import { useState } from 'react';
import Step1Agree from './Step1Agree';
import Step2Choose from './Step2Choose';

const Online = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="mt-10 mb-[80px]">
      {step === 1 && <Step1Agree onNext={() => setStep(2)} />}
      {step === 2 && <Step2Choose />}
    </div>
  );
};

export default Online;
