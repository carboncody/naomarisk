import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { Check } from 'lucide-react';
import { type ReactNode } from 'react';

interface BaseOption {
  label: ReactNode;
  value: string;
  href?: string;
}

interface SingleDropdownProps {
  selectedValue: string | null;
  options: BaseOption[];
  buttonLabel: ReactNode;
  setSelectedValue: (value: string | null) => void;
  customTriggerBtn?: ReactNode;
  triggerClassName?: string;
  popoverClassName?: string;
}

export function SingleDropdown({
  buttonLabel,
  selectedValue,
  setSelectedValue,
  options,
  customTriggerBtn,
  triggerClassName,
  popoverClassName,
}: SingleDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn('w-full', triggerClassName)}>
        {customTriggerBtn ?? (
          <Button className="text-md w-full">
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : buttonLabel}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onMouseDown={(e) => e.stopPropagation()}
        style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}
        className={cn(popoverClassName)}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              if (option.value === selectedValue) {
                setSelectedValue(null);
                return;
              }
              setSelectedValue(option.value);
            }}
            asChild
          >
            <div className="flex w-full items-center justify-between truncate">
              {option.href ? (
                <a
                  href={option.href}
                  className="truncate no-underline dark:text-white"
                >
                  {option.label}
                </a>
              ) : (
                <span className="truncate dark:text-white">{option.label}</span>
              )}
              <Check
                className={cn(
                  'ml-2 h-4 w-4 opacity-0',
                  selectedValue === option.value && 'opacity-100',
                )}
              />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
