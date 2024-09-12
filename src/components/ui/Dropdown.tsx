import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
}

export function SingleDropdown({
  buttonLabel,
  selectedValue,
  setSelectedValue,
  options,
  customTriggerBtn,
}: SingleDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {customTriggerBtn ?? (
          <Button className="text-md">
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : buttonLabel}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent onMouseDown={(e) => e.stopPropagation()}>
        <DropdownMenuLabel className="text-md">{buttonLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
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
            <div className="flex w-full items-center justify-between">
              {option.href ? (
                <a href={option.href} className="no-underline dark:text-white">
                  {option.label}
                </a>
              ) : (
                <span className="dark:text-white">{option.label}</span>
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
