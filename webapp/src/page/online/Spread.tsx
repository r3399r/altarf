import Body from 'src/components/typography/Body';
import IcSpread from 'src/assets/ic-spread.svg';

type Props = {
  title: string;
  desc: string;
};

const Spread = ({ title, desc }: Props) => {
  return (
    <div className="text-center pb-[11px]">
      <img src={IcSpread} />
      <Body bold className="mt-3 mb-1">
        {title}
      </Body>
      <Body size="m">{desc}</Body>
    </div>
  );
};

export default Spread;
