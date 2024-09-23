import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@lib/utils';
import { Check } from 'lucide-react';
import { Button } from '../button';

type Option = {
  value: number | null;
  label: string;
};

type ScoreDropdownProps = {
  label: string;
  selectedValue: number | null;
  onSelect: (value: number | null) => void;
};

const options: Option[] = [
  { value: null, label: 'Udefinieret' },
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

export function ScoreDropdown({
  label,
  selectedValue,
  onSelect,
}: ScoreDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <Button className="text-md w-full">
          {selectedValue ? selectedValue : label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onSelect(option.value)}
            className="flex w-full items-center justify-between truncate"
          >
            {option.label}
            <Check
              className={cn(
                'ml-2 h-4 w-4 opacity-0',
                selectedValue === option.value && 'opacity-100',
              )}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}