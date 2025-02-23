import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLHeadingElement>;

const H3 = ({ className, ...props }: Props) => (
  <h3
    className={classNames('font-bold text-[1.5rem] leading-[1.33] m-0 text-text-title', className)}
    {...props}
  />
);

export default H3;
