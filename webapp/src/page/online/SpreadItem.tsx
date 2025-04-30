import classNames from 'classnames';
import IcSpread from 'src/assets/ic-spread.svg';
import Body from 'src/components/typography/Body';

type Props = {
  title: string;
  desc: string;
  onClick: () => void;
  selected: boolean;
};

const SpreadItem = ({ title, desc, onClick, selected }: Props) => (
  <div className="w-[120px] pb-[11px] text-center">
    <img
      src={IcSpread}
      className={classNames('cursor-pointer rounded-[4px] border-2', {
        'border-border-focus': selected,
        'border-transparent': !selected,
      })}
      onClick={onClick}
    />
    <Body bold className="mt-3 mb-1">
      {title}
    </Body>
    <Body size="m">{desc}</Body>
  </div>
);

export default SpreadItem;
