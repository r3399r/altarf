import classNames from 'classnames';
import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLHeadingElement>;

const H1 = ({ className, ...props }: Props) => (
  <h1 className={classNames('font-bold text-[2.5rem] leading-[1.4] m-0', className)} {...props} />
);

export default H1;
