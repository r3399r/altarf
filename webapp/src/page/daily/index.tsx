import { useMemo, useState } from 'react';
import PicDraw from 'src/assets/pic-draw.svg';
import PicShadow from 'src/assets/pic-shadow.svg';
import IcCardFrame from 'src/assets/ic-card-frame.svg';
import IcStar from 'src/assets/ic-star.svg';
import { drawTarotDaily } from 'src/service/tarotService';
import { GetTaortDailyResponse } from 'src/model/backend/api/Tarot';
import Body from 'src/components/typography/Body';
import H4 from 'src/components/typography/H4';

const Daily = () => {
  const [drawnCard, setDrawnCard] = useState<GetTaortDailyResponse>();
  const isDrawn = useMemo(() => !!drawnCard, [drawnCard]);

  const onClickDraw = () => {
    drawTarotDaily().then((res) => {
      setDrawnCard(res);
    });
  };

  if (isDrawn) {
    return (
      <div>
        <div className="relative flex items-center justify-center mt-10 sm:mt-[80px]">
          <img src={IcCardFrame} className="w-full sm:w-[640px] md:w-[696px]" />
          <img
            src={`/card/${drawnCard?.cardId}.jpg`}
            className="absolute top-1/2 left-1/2 -translate-1/2 h-[calc(100%-36px)] w-auto"
          />
        </div>
        <div className="mt-[53px] border-y-border-content border-y-2 px-4 pt-10 py-6 relative">
          <div className="absolute flex items-center top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background-surface-body gap-2">
            <img src={IcStar}></img>
            <H4>{drawnCard?.name}</H4>
            <img src={IcStar}></img>
          </div>
          <Body className="whitespace-pre-line">{drawnCard?.interpretation}</Body>
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
