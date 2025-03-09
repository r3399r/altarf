import { useState } from 'react';
import Step1Agree from './Step1Agree';
import Step2Ask from './Step2Ask';
import Step3Pick from './Step3Pick';
import Step4Interpretation from './Step4Interpretation';

const Online = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedSpreadId, setSelectedSpreadId] = useState<string>();

  return (
    <div className="mt-10 mb-[80px] sm:mt-[80px]">
      {step === 1 && <Step1Agree onNext={() => setStep(2)} />}
      {step === 2 && (
        <Step2Ask
          onNext={(id: string) => {
            setStep(3);
            setSelectedSpreadId(id);
          }}
        />
      )}
      {step === 3 && <Step3Pick spreadId={selectedSpreadId} onNext={() => setStep(4)} />}
      {step === 4 && <Step4Interpretation />}
    </div>
  );
};

export default Online;
