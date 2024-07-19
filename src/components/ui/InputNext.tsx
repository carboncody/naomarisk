import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Input } from '@components/ui/Input';

type NextReactInputProps = ComponentPropsWithoutRef<typeof Input>;

export const NextInput = forwardRef<HTMLInputElement, NextReactInputProps>(
  ({ className, ...props }, ref) => {
    const hasPlaceholder = props.placeholder !== undefined;
    return (
      <Input
        {...props}
        ref={ref}
        className={`form-input w-full flex-grow ${className} rounded-xl bg-[#27272a]`}
      />
    );
  },
);

NextInput.displayName = 'NextInput';
