import classNames from 'classnames';
import IcCardFrame from 'src/assets/ic-card-frame.svg';
import PicDraw from 'src/assets/pic-draw.svg';
import PicShadow from 'src/assets/pic-shadow.svg';
import StarDivision from 'src/components/StarDivision';
import Body from 'src/components/typography/Body';
import useMediaQuery from 'src/hook/useMediaQuery';
import useFlow from './useFlow';

const drawnHint = '今天已經抽過牌，請等到明天 00:00 再進行下一次抽牌';

const Daily = () => {
  const { drawnCard, onDraw } = useFlow();
  const { isMobile } = useMediaQuery();

  if (drawnCard)
    return (
      <div>
        <div className="relative mt-10 flex items-center justify-center sm:mt-[80px]">
          <img src={IcCardFrame} className="w-full sm:w-[640px] md:w-[696px]" />
          <img
            src={`/card/${drawnCard.cardId}.jpg`}
            className={classNames(
              'absolute top-1/2 left-1/2 h-[calc(100%-24px)] w-auto -translate-1/2 rounded-md border-4 border-white sm:h-[calc(100%-36px)]',
              {
                'rotate-180': drawnCard.reversal,
              },
            )}
          />
        </div>
        <StarDivision
          className="mt-[53px] px-4 py-6 pt-10"
          title={`${drawnCard.name} (${drawnCard.reversal ? '逆位' : '正位'})`}
        >
          <Body className="whitespace-pre-line">{drawnCard.interpretation}</Body>
        </StarDivision>
        {!isMobile && (
          <div className="mt-8 flex items-center justify-center">
            <Body bold className="bg-background-surface-overlay-normal px-4 py-3">
              {drawnHint}
            </Body>
          </div>
        )}
        {isMobile && (
          <Body
            bold
            className="fixed bottom-0 left-0 w-full bg-background-surface-overlay-normal px-4 py-3 text-center"
          >
            {drawnHint}
          </Body>
        )}
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
