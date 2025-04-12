import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: 'primary' | 'secondary';
};

const Button = ({ appearance = 'primary', className, ...props }: Props) => (
  <button
    className={classNames(
      'rounded-[4px] px-8 py-4 leading-[1.5] font-bold outline-none enabled:cursor-pointer disabled:cursor-not-allowed',
      className,
      {
        'bg-background-button-primary-normal text-text-button-primary-normal hover:enabled:bg-background-button-primary-hover active:enabled:bg-background-button-primary-active disabled:bg-background-button-primary-normal/50':
          appearance === 'primary',
        'bg-background-button-secondary-normal text-text-button-secondary-normal':
          appearance === 'secondary',
      },
    )}
    {...props}
  />
);

export default Button;
