import classNames from 'classnames';
import { useMemo, useState } from 'react';
import PicCardBack from 'src/assets/pic-card-back.svg';
import Button from 'src/components/Button';
import StarTitle from './StarTitle';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

type Props = {
  onSend: () => void;
};

const Step3Pick = ({ onSend }: Props) => {
  const { pickedSpread } = useSelector((rootState: RootState) => rootState.tarot);
  const [visibleCard, setVisibleCard] = useState<Set<number>>(new Set());
  const isReady = useMemo(() => {
    return pickedSpread === null ? false : visibleCard.size === Number(pickedSpread.drawnCardCount);
  }, [pickedSpread, visibleCard]);

  if (!pickedSpread) return <>Something went wrong, please redo</>;

  return (
    <>
      <div className="mt-11 mb-[85px] flex flex-wrap items-center justify-center gap-8">
        {[...Array(Number(pickedSpread.drawnCardCount)).keys()].map((i) => {
          return (
            <img
              key={i}
              src={PicCardBack}
              className={classNames('rounded-md border-4 border-white', {
                invisible: !visibleCard.has(i),
              })}
            />
          );
        })}
      </div>
      <StarTitle title={`此牌陣需抽 ${pickedSpread.drawnCardCount} 張牌`} />
      <div className="mt-10 text-center">
        <Button
          onClick={() => {
            if (isReady) {
              onSend();
            } else {
              for (let i = 0; i < Number(pickedSpread.drawnCardCount); i++) {
                if (!visibleCard.has(i)) {
                  const newSet = new Set(visibleCard);
                  newSet.add(i);
                  setVisibleCard(newSet);
                  break;
                }
              }
            }
          }}
        >
          {isReady ? '我選好了' : `抽第 ${visibleCard.size + 1} 張牌`}
        </Button>
      </div>
    </>
  );
};

export default Step3Pick;
