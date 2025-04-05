import Body from 'src/components/typography/Body';
import IcSpread from 'src/assets/ic-spread.svg';
import classNames from 'classnames';

type Props = {
  title: string;
  desc: string;
  onClick: () => void;
  selected: boolean;
};

const Spread = ({ title, desc, onClick, selected }: Props) => {
  return (
    <div className="text-center pb-[11px] w-[120px]">
      <img
        src={IcSpread}
        className={classNames('cursor-pointer border-2 rounded-[4px]', {
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
};

export default Spread;
