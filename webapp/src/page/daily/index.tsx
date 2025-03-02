import { useMemo, useState } from 'react';
import PicDraw from 'src/assets/pic-draw.svg';
import PicShadow from 'src/assets/pic-shadow.svg';
import IcCardFrame from 'src/assets/ic-card-frame.svg';
import { drawTarotDaily } from 'src/service/tarotService';
import { GetTaortDailyResponse } from 'src/model/backend/api/Tarot';
import Body from 'src/components/typography/Body';
import classNames from 'classnames';
import StarDivision from 'src/components/StarDivision';

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
            className={classNames(
              'absolute top-1/2 left-1/2 -translate-1/2 h-[calc(100%-24px)] sm:h-[calc(100%-36px)] w-auto border-white border-4 rounded-md',
              {
                'rotate-180': drawnCard?.reversal,
              },
            )}
          />
        </div>
        <StarDivision
          className="mt-[53px] border-y-border-content border-y-2 px-4 pt-10 py-6 relative"
          title={`${drawnCard?.name} (${drawnCard?.reversal ? '逆位' : '正位'})`}
        >
          <Body className="whitespace-pre-line">{drawnCard?.interpretation}</Body>
        </StarDivision>
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
