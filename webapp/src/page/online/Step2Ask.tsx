import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/Button';
import Textarea from 'src/components/Textarea';
import useTarotInfo from 'src/hook/useTarotInfo';
import { RootState } from 'src/redux/store';
import { setPickedSpread, setQuestion } from 'src/redux/tarotSlice';
import SpreadItem from './SpreadItem';
import StarTitle from './StarTitle';

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
    <div className="mt-10 sm:mt-20">
      <StarTitle title="選擇一種牌陣" />
      <div className="mt-8 mb-14 flex flex-wrap justify-around gap-4 md:mb-10">
        {spreadList?.map((v) => (
          <SpreadItem
            key={v.id}
            tarotSpread={v}
            onClick={() => dispatch(setPickedSpread(v))}
            selected={pickedSpread?.id === v.id}
          ></SpreadItem>
        ))}
      </div>
      <StarTitle title="敘述你的問題" />
      <Textarea
        className="mt-8 mb-10 h-[120px]"
        placeholder="50字以內"
        value={question ?? ''}
        onChange={(e) => dispatch(setQuestion(e.target.value))}
      />
      <div className="text-center">
        <Button className="mt-10" disabled={!isReady} onClick={onNext}>
          我準備好抽牌了
        </Button>
      </div>
    </div>
  );
};

export default Step2Ask;
