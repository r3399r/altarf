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
          className="mb-[5px] text-text-input-subtle disabled:text-text-input-subtle-disabled"
        >
          {label}
        </Body>
      )}
      <textarea
        className={classNames(
          className,
          'h-16 w-full rounded-[8px] border-[1px] border-solid bg-background-textfield-normal p-3 outline-none focus:border-border-focus',
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
