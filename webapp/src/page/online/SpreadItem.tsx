import classNames from 'classnames';
import IcSpread from 'src/assets/ic-spread.svg';
import Body from 'src/components/typography/Body';
import { TarotSpread } from 'src/model/backend/Tarot';

type Props = {
  tarotSpread: TarotSpread;
  onClick: () => void;
  selected: boolean;
};

const SpreadItem = ({ tarotSpread, onClick, selected }: Props) => (
  <div
    className={classNames(
      'flex w-full cursor-pointer items-center gap-3 rounded-lg border border-border-spread-normal p-4 sm:w-[calc(50%-8px)] md:w-[calc((100%-32px)/3)]',
      {
        '!border-border-spread-active bg-background-surface-list': selected,
      },
    )}
    onClick={onClick}
  >
    <img src={IcSpread} />
    <div className="flex flex-col gap-1 text-left">
      <Body bold>{tarotSpread.name}</Body>
      <Body size="m">{tarotSpread.description}</Body>
      <Body size="m" className="text-text-secondary">
        {tarotSpread.isAiSupport ? 'AI解牌/真人解牌' : '真人解牌'}
      </Body>
    </div>
  </div>
);

export default SpreadItem;
