import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PicCardBack from 'src/assets/pic-card-back.svg';
import Button from 'src/components/Button';
import { RootState } from 'src/redux/store';
import StarTitle from './StarTitle';

type Props = {
  onSend: () => void;
};

const Step3Pick = ({ onSend }: Props) => {
  const { pickedSpread } = useSelector((rootState: RootState) => rootState.tarot);
  const [numPickedCards, setPickedCardList] = useState<number>(0);
  const isReady = useMemo(
    () => (!pickedSpread ? false : numPickedCards === Number(pickedSpread.drawnCardCount)),
    [pickedSpread, numPickedCards],
  );

  if (!pickedSpread) return <>Something went wrong, please redo</>;

  const onClick = () => {
    if (isReady) onSend();
    else setPickedCardList(numPickedCards + 1);
  };

  return (
    <>
      <div className="mt-11 mb-[85px] flex flex-wrap items-center justify-center gap-8">
        {[...Array(Number(pickedSpread.drawnCardCount)).keys()].map((i) => (
          <img
            key={i}
            src={PicCardBack}
            className={classNames('rounded-md border-4 border-white', {
              invisible: i >= numPickedCards,
            })}
          />
        ))}
      </div>
      <StarTitle title={`此牌陣需抽 ${pickedSpread.drawnCardCount} 張牌`} />
      <div className="mt-10 text-center">
        <Button onClick={onClick}>
          {isReady ? '我選好了' : `抽第 ${numPickedCards + 1} 張牌`}
        </Button>
      </div>
    </>
  );
};

export default Step3Pick;
