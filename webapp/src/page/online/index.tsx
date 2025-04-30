import Step1Agree from './Step1Agree';
import Step2Ask from './Step2Ask';
import Step3Pick from './Step3Pick';
import useFlow from './useFlow';

const Online = () => {
  const { step, goToStep2, goToStep3, onSend, onPick } = useFlow();

  return (
    <div>
      {step === 1 && <Step1Agree onNext={goToStep2} />}
      {step === 2 && <Step2Ask onNext={goToStep3} />}
      {step === 3 && <Step3Pick onSend={onSend} onPick={onPick} />}
    </div>
  );
};

export default Online;
