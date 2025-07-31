import classNames from 'classnames';
import { useMemo } from 'react';
import PicCardBack from 'src/assets/pic-card-back.svg';
import H4 from 'src/components/typography/H4';
import { TarotSpread } from 'src/model/backend/Tarot';
import { PickedCard } from 'src/model/Card';
import Body from './typography/Body';

type Props = {
  spread: TarotSpread;
  cardList: PickedCard[];
  showCardBack: boolean;
};

const Canvas = ({ spread, cardList, showCardBack }: Props) => {
  const Card = ({
    className,
    num,
    meaning,
  }: {
    className: string;
    num: number;
    meaning: string;
  }) => {
    const showCard = useMemo(() => cardList.length >= num, [num]);
    const thisCard = useMemo(() => cardList[num - 1], [num]);

    return showCard ? (
      showCardBack ? (
        <img
          src={PicCardBack}
          className={classNames('aspect-4/7 h-30 rounded-md border-4 border-white', {
            [className]: !!className,
          })}
        />
      ) : (
        <div className="relative">
          <img
            src={`/card/${thisCard.id}.jpg`}
            className={classNames('aspect-4/7 h-30 rounded-md border-4 border-white', {
              'rotate-180': thisCard.reversed,
              [className]: !!className,
            })}
          />
          <Body
            size="s"
            className="absolute flex w-full items-center justify-center whitespace-nowrap"
          >
            {thisCard.name} ({thisCard.reversed ? '逆位' : '正位'})
          </Body>
          <Body
            size="s"
            className="absolute -top-2 left-1/2 flex w-fit -translate-x-1/2 rounded bg-grey-900/70 p-0.5 whitespace-nowrap !text-orange-300"
          >
            {meaning}
          </Body>
        </div>
      )
    ) : (
      <div
        className={classNames(
          'flex aspect-4/7 h-30 items-center justify-center rounded-xs border border-dashed border-beige-400',
          { [className]: !!className },
        )}
      >
        <H4 className="!text-beige-300">{num}</H4>
      </div>
    );
  };

  const SpreadCanvas = () => {
    switch (spread.id) {
      case 'SINGLE': {
        return (
          <div className="flex h-full w-full items-center justify-center">
            <Card className="sm:!h-[210px]" num={1} meaning={spread.meaning[0]} />
          </div>
        );
      }
      case 'LINEAR': {
        return (
          <div className="absolute top-[140px] flex w-full items-center justify-center gap-10 sm:top-[180px] sm:gap-24">
            <Card className="sm:!h-40" num={1} meaning={spread.meaning[0]} />
            <Card className="sm:!h-40" num={2} meaning={spread.meaning[1]} />
            <Card className="sm:!h-40" num={3} meaning={spread.meaning[2]} />
          </div>
        );
      }
      case 'FOUR_ELEMENT': {
        return (
          <>
            <div className="absolute top-[40px] flex w-full items-center justify-center gap-30 sm:top-[60px] sm:gap-60">
              <Card className="sm:!h-40" num={1} meaning={spread.meaning[0]} />
              <Card className="sm:!h-40" num={3} meaning={spread.meaning[2]} />
            </div>
            <div className="absolute top-[200px] flex w-full items-center justify-center gap-30 sm:top-[300px] sm:gap-60">
              <Card className="sm:!h-40" num={2} meaning={spread.meaning[1]} />
              <Card className="sm:!h-40" num={4} meaning={spread.meaning[3]} />
            </div>
          </>
        );
      }
      case 'CROSS': {
        return (
          <div className="flex flex-col gap-8 py-10 sm:py-20">
            <div className="flex justify-center">
              <Card className="!h-21 sm:!h-[98px]" num={1} meaning={spread.meaning[0]} />
            </div>
            <div className="flex w-full justify-center gap-[66px] sm:gap-33">
              <Card className="!h-21 sm:!h-[98px]" num={3} meaning={spread.meaning[2]} />
              <Card className="!h-21 sm:!h-[98px]" num={5} meaning={spread.meaning[4]} />
              <Card className="!h-21 sm:!h-[98px]" num={4} meaning={spread.meaning[3]} />
            </div>
            <div className="flex justify-center">
              <Card className="!h-21 sm:!h-[98px]" num={2} meaning={spread.meaning[1]} />
            </div>
          </div>
        );
      }
      case 'HEXAGRAM': {
        return (
          <div className="flex flex-col gap-2 py-6 sm:gap-4 sm:py-12">
            <div className="flex justify-center">
              <Card className="!h-21 sm:!h-[98px]" num={4} meaning={spread.meaning[3]} />
            </div>
            <div className="flex w-full justify-center gap-30 sm:gap-60">
              <Card className="!h-21 sm:!h-[98px]" num={2} meaning={spread.meaning[1]} />
              <Card className="!h-21 sm:!h-[98px]" num={3} meaning={spread.meaning[2]} />
            </div>
            <div className="flex w-full justify-center gap-30 sm:gap-60">
              <Card className="!h-21 sm:!h-[98px]" num={6} meaning={spread.meaning[5]} />
              <Card className="!h-21 sm:!h-[98px]" num={5} meaning={spread.meaning[4]} />
            </div>
            <div className="flex justify-center">
              <Card className="!h-21 sm:!h-[98px]" num={1} meaning={spread.meaning[0]} />
            </div>
          </div>
        );
      }
      case 'CUP': {
        return (
          <div className="flex flex-col gap-2 py-6 sm:gap-4 sm:py-12">
            <div className="flex w-full justify-center gap-30 sm:gap-60">
              <Card className="!h-21 sm:!h-[98px]" num={1} meaning={spread.meaning[0]} />
              <Card className="!h-21 sm:!h-[98px]" num={7} meaning={spread.meaning[6]} />
            </div>
            <div className="flex w-full justify-center gap-30 sm:gap-60">
              <Card className="!h-21 sm:!h-[98px]" num={2} meaning={spread.meaning[1]} />
              <Card className="!h-21 sm:!h-[98px]" num={6} meaning={spread.meaning[5]} />
            </div>
            <div className="flex w-full justify-center gap-30 sm:gap-60">
              <Card className="!h-21 sm:!h-[98px]" num={3} meaning={spread.meaning[2]} />
              <Card className="!h-21 sm:!h-[98px]" num={5} meaning={spread.meaning[4]} />
            </div>
            <div className="flex justify-center">
              <Card className="!h-21 sm:!h-[98px]" num={4} meaning={spread.meaning[3]} />
            </div>
          </div>
        );
      }
      default:
        return <div>Unsupported Spread</div>;
    }
  };

  return (
    <div className="relative flex justify-center">
      <div className="relative h-100 w-80 sm:h-130 sm:w-160">
        <SpreadCanvas />
      </div>
    </div>
  );
};

export default Canvas;
