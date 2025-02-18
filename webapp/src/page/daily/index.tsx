import { useMemo, useState } from 'react';
import PicDraw from 'src/assets/pic-draw.svg';
import PicShadow from 'src/assets/pic-shadow.svg';
import { TarotDaily } from 'src/model/backend/entity/TarotDailyEntity';
import { drawTarotDaily } from 'src/service/tarotService';

const Daily = () => {
  const [drawnCard, setDrawnCard] = useState<TarotDaily>();
  const isDrawn = useMemo(() => !!drawnCard, [drawnCard]);

  const onClickDraw = () => {
    drawTarotDaily().then((res) => {
      setDrawnCard(res);
    });
  };

  if (isDrawn) {
    return (
      <div className="flex justify-center">
        <div className="mt-10 flex w-fit flex-col items-center justify-center gap-10 sm:mt-20">
          <div>{drawnCard?.cardId}</div>
          <img src={`/card/${drawnCard?.cardId}.jpg`} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        className="mt-10 flex w-fit cursor-pointer flex-col items-center justify-center gap-10 sm:mt-20"
        onClick={onClickDraw}
      >
        <img src={PicDraw} />
        <img src={PicShadow} />
      </div>
    </div>
  );
};

export default Daily;
