import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLHeadingElement>;

const H2 = ({ className, ...props }: Props) => (
  <h2
    className={classNames(
      'm-0 font-serif text-[1.75rem] leading-[1.2] font-bold text-text-title',
      className,
    )}
    {...props}
  />
);

export default H2;
