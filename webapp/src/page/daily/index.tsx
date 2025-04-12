import classNames from 'classnames';
import IcCardFrame from 'src/assets/ic-card-frame.svg';
import PicDraw from 'src/assets/pic-draw.svg';
import PicShadow from 'src/assets/pic-shadow.svg';
import StarDivision from 'src/components/StarDivision';
import Body from 'src/components/typography/Body';
import useFlow from './useFlow';

const Daily = () => {
  const { isDrawn, drawnCard, onDraw } = useFlow();

  if (isDrawn)
    return (
      <div>
        <div className="relative mt-10 flex items-center justify-center sm:mt-[80px]">
          <img src={IcCardFrame} className="w-full sm:w-[640px] md:w-[696px]" />
          <img
            src={`/card/${drawnCard?.cardId}.jpg`}
            className={classNames(
              'absolute top-1/2 left-1/2 h-[calc(100%-24px)] w-auto -translate-1/2 rounded-md border-4 border-white sm:h-[calc(100%-36px)]',
              {
                'rotate-180': drawnCard?.reversal,
              },
            )}
          />
        </div>
        <StarDivision
          className="mt-[53px] px-4 py-6 pt-10"
          title={`${drawnCard?.name} (${drawnCard?.reversal ? '逆位' : '正位'})`}
        >
          <Body className="whitespace-pre-line">{drawnCard?.interpretation}</Body>
        </StarDivision>
      </div>
    );

  return (
    <div className="flex justify-center">
      <div
        className="mt-10 flex w-fit cursor-pointer flex-col items-center justify-center gap-10 sm:mt-20"
        onClick={onDraw}
      >
        <img src={PicDraw} />
        <img src={PicShadow} />
      </div>
    </div>
  );
};

export default Daily;
