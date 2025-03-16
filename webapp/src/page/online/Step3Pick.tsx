import classNames from 'classnames';
import { useMemo, useState } from 'react';
import PicCardBack from 'src/assets/pic-card-back.svg';
import Button from 'src/components/Button';
import StarTitle from './StarTitle';
import { Spread } from 'src/model/Spread';

type Props = {
  spreadId: string | undefined;
  onNext: () => void;
};

const Step3Pick = ({ spreadId, onNext }: Props) => {
  const spread = useMemo(() => {
    return Spread.find((v) => v.id === spreadId);
  }, [spreadId]);
  const [visibleCard, setVisibleCard] = useState<Set<number>>(new Set());
  const isReady = useMemo(() => {
    return spread === undefined ? false : visibleCard.size === spread.pickTotal;
  }, [spread, visibleCard]);

  if (!spread) return <>Loading...</>;

  return (
    <>
      <div className="flex gap-8 justify-center items-center mt-11 mb-[85px] flex-wrap">
        {[...Array(spread.pickTotal).keys()].map((i) => {
          return (
            <img
              src={PicCardBack}
              className={classNames('border-white border-4 rounded-md', {
                invisible: !visibleCard.has(i),
              })}
            />
          );
        })}
      </div>
      <StarTitle title={`此牌陣需抽 ${spread.pickTotal} 張牌`} />
      <div className="text-center mt-10">
        <Button
          onClick={() => {
            if (isReady) {
              onNext();
            } else {
              for (let i = 0; i < spread.pickTotal; i++) {
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
