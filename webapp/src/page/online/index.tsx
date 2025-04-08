import Step1Agree from './Step1Agree';
import Step2Ask from './Step2Ask';
import Step3Pick from './Step3Pick';
import useFlow from './useFlow';

const Online = () => {
  const { step, goToStep2, goToStep3, onSend } = useFlow();

  return (
    <div className="mt-10 mb-[80px] sm:mt-[80px]">
      {step === 1 && <Step1Agree onNext={goToStep2} />}
      {step === 2 && <Step2Ask onNext={goToStep3} />}
      {step === 3 && <Step3Pick onSend={onSend} />}
    </div>
  );
};

export default Online;
