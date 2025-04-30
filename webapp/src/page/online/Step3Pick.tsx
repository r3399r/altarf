import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Button from 'src/components/Button';
import Canvas from 'src/components/Canvas';
import { RootState } from 'src/redux/store';
import StarTitle from './StarTitle';

type Props = {
  onSend: () => void;
  onPick: () => void;
};

const Step3Pick = ({ onSend, onPick }: Props) => {
  const { pickedSpread, pickedCardList } = useSelector((rootState: RootState) => rootState.tarot);
  const isReady = useMemo(
    () => (!pickedSpread ? false : pickedCardList?.length === Number(pickedSpread.drawnCardCount)),
    [pickedSpread, pickedCardList],
  );

  if (!pickedSpread) return <>Something went wrong, please redo</>;

  const onClick = () => {
    if (isReady) onSend();
    else onPick();
  };

  return (
    <>
      <Canvas cardList={pickedCardList ?? []} showCardBack={true} spreadId={pickedSpread.id} />
      <StarTitle title={`此牌陣需抽 ${pickedSpread.drawnCardCount} 張牌`} />
      <div className="mt-10 text-center">
        <Button onClick={onClick}>
          {isReady ? '我選好了' : `抽第 ${(pickedCardList?.length ?? 0) + 1} 張牌`}
        </Button>
      </div>
    </>
  );
};

export default Step3Pick;
