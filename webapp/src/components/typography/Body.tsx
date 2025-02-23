import classNames from 'classnames';
import { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement> & {
  size?: 'l' | 'm' | 's';
  bold?: boolean;
};

const Body = ({ size = 'l', bold = false, className, ...props }: Props) => (
  <div
    className={classNames('text-text-body', className, {
      'font-bold': bold,
      'text-base': size === 'l',
      'text-[0.875rem] leading-normal': size === 'm',
      'text-[0.75rem] leading-normal': size === 's',
    })}
    {...props}
  />
);

export default Body;
