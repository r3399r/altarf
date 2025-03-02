import classNames from 'classnames';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import Body from './typography/Body';

export type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helper?: string;
  error?: boolean | string;
};

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, helper, error, disabled, className, ...props }, ref) => (
    <div>
      {label && (
        <Body
          size="m"
          className="text-text-input-subtle disabled:text-text-input-subtle-disabled mb-[5px]"
        >
          {label}
        </Body>
      )}
      <textarea
        className={classNames(
          className,
          'rounded-[8px] bg-background-textfield-normal outline-none p-3 h-16 w-full border-solid border-[1px] focus:border-border-focus',
          {
            'border-border-error': !!error,
            'border-background-textfield-normal': !error,
            'opacity-30': !!disabled,
          },
        )}
        ref={ref}
        disabled={disabled}
        autoComplete="off"
        {...props}
      />
      {(typeof error === 'string' || helper) && (
        <div className="mt-1">
          {typeof error === 'string' && (
            <Body size="s" className="text-text-error">
              {error}
            </Body>
          )}
          {helper && (
            <Body size="s" className="text-text-input-helper">
              {helper}
            </Body>
          )}
        </div>
      )}
    </div>
  ),
);

export default Textarea;
