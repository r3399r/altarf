import Textarea from 'src/components/Textarea';
import Spread from './Spread';
import StarTitle from './StarTitle';
import Button from 'src/components/Button';
import { useMemo } from 'react';
import useTarotInfo from 'src/hook/useTarotInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setPickedSpread, setQuestion } from 'src/redux/tarotSlice';
import { RootState } from 'src/redux/store';

type Props = {
  onNext: () => void;
};

const Step2Ask = ({ onNext }: Props) => {
  const dispatch = useDispatch();
  const { spreadList } = useTarotInfo();
  const { pickedSpread, question } = useSelector((rootState: RootState) => rootState.tarot);
  const isReady = useMemo(
    () => (question !== null && question.length > 0 && pickedSpread !== null ? true : false),
    [question, pickedSpread],
  );

  return (
    <>
      <StarTitle title="選擇一種牌陣" />
      <div className="mt-8 mb-10 flex gap-x-[40px] gap-y-8 flex-wrap justify-around sm:mb-[58px] md:mb-[80px]">
        {spreadList
          ?.filter((v) => v.aiSupported)
          .map((v) => {
            return (
              <Spread
                key={v.id}
                title={v.name}
                desc={v.description}
                onClick={() => dispatch(setPickedSpread(v))}
                selected={pickedSpread?.id === v.id}
              ></Spread>
            );
          })}
      </div>
      <StarTitle title="敘述你的問題" />
      <Textarea
        className="h-[120px] mt-8 mb-10"
        placeholder="50字以內"
        value={question ?? ''}
        onChange={(e) => dispatch(setQuestion(e.target.value))}
      />
      <div className="text-center">
        <Button className="mt-10" disabled={!isReady} onClick={onNext}>
          我準備好抽牌了
        </Button>
      </div>
    </>
  );
};

export default Step2Ask;
