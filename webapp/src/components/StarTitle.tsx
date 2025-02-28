import H4 from './typography/H4';
import IcStar from 'src/assets/ic-star.svg';

type Props = {
  title: string;
};

const StarTitle = ({ title }: Props) => {
  return (
    <div className="absolute flex items-center top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background-surface-body gap-2">
      <img className="bg-background-surface-body md:w-[40px]" src={IcStar}></img>
      <H4 className="whitespace-nowrap md:text-[1.5rem] md:leading-[1.33]">{title}</H4>
      <img className="bg-background-surface-body md:w-[40px]" src={IcStar}></img>
    </div>
  );
};

export default StarTitle;
