import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { type ReactNode } from 'react';

interface BaseOption {
  label: ReactNode;
  value: string;
  href?: string;
}

interface SingleDropdownProps {
  selectedValue: string | undefined;
  options: BaseOption[];
  buttonLabel: ReactNode;
  setSelectedValue: (value: string | undefined) => void;
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
          <Button className="text-md dark:bg-zinc-500">
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : buttonLabel}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#413e3e] text-white">
        <DropdownMenuLabel className="text-md">{buttonLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setSelectedValue(option.value)}
            asChild
          >
            {option.href ? (
              <a href={option.href} className="text-white no-underline">
                {option.label}
              </a>
            ) : (
              <span className="text-white">{option.label}</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
