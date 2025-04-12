import classNames from 'classnames';
import { ReactNode } from 'react';
import IcStar from 'src/assets/ic-star.svg';
import H4 from './typography/H4';

type Props = {
  title: string;
  children: ReactNode;
  className: string;
};

const StarDivision = ({ title, children, className }: Props) => (
  <div className={classNames('relative border-y-2 border-y-border-content', className)}>
    <div className="absolute top-0 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 bg-background-surface-body">
      <img className="bg-background-surface-body md:w-[40px]" src={IcStar}></img>
      <H4 className="whitespace-nowrap md:text-[1.5rem] md:leading-[1.33]">{title}</H4>
      <img className="bg-background-surface-body md:w-[40px]" src={IcStar}></img>
    </div>
    {children}
  </div>
);

export default StarDivision;
