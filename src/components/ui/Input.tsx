import { Input } from '@nextui-org/react';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type NextReactInputProps = ComponentPropsWithoutRef<typeof Input>;

export const NextInput = forwardRef<HTMLInputElement, NextReactInputProps>(
  ({ className, ...props }, ref) => {
    const hasPlaceholder = props.placeholder !== undefined;
    return (
      <Input
        {...props}
        ref={ref}
        className={`form-input w-full flex-grow ${className}`}
        labelPlacement={hasPlaceholder ? 'outside' : undefined}
        classNames={{
          inputWrapper:
            'border-1 border-gray-400 hover:border-white data-[hover=true]:border-white group-data-[focus=true]:border-white',
          label:
            'text-xs text-black md:text-sm text-gray-300 group-hover:text-white group-data-[filled-within=true]:text-white',
          errorMessage: 'text-red-400',
        }}
        variant="bordered"
        radius="sm"
        fullWidth
        color="default"
      />
    );
  },
);

NextInput.displayName = 'NextInput';
