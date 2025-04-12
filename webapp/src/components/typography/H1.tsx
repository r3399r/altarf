import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLHeadingElement>;

const H1 = ({ className, ...props }: Props) => (
  <h1
    className={classNames(
      'm-0 font-serif text-[2.5rem] leading-[1.4] font-bold text-text-title',
      className,
    )}
    {...props}
  />
);

export default H1;
