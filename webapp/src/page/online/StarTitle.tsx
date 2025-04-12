import H4 from 'src/components/typography/H4';
import IcStar from 'src/assets/ic-star.svg';

type Props = {
  title: string;
};

const StarTitle = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <img className="bg-background-surface-body md:w-[40px]" src={IcStar}></img>
      <H4 className="whitespace-nowrap md:text-[1.5rem] md:leading-[1.33]">{title}</H4>
      <img className="bg-background-surface-body md:w-[40px]" src={IcStar}></img>
    </div>
  );
};

export default StarTitle;
