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
  type: 'consequence' | 'probability';
  label: string;
  selectedValue: number | null;
  onSelect: (value: number | null) => void;
};

export function ScoreDropdown({
  type,
  label,
  selectedValue,
  onSelect,
}: ScoreDropdownProps) {
  const options: Option[] = [
    { value: null, label: 'Udefinieret' },
    {
      value: 1,
      label:
        '1 - ' + (type === 'probability' ? 'Meget usandsynligt' : 'Meget lav'),
    },
    {
      value: 2,
      label: '2 - ' + (type === 'probability' ? 'Usandsynligt' : 'Lav'),
    },
    {
      value: 3,
      label: '3 - ' + (type === 'probability' ? 'Sandsynligt' : 'Moderat'),
    },
    {
      value: 4,
      label:
        '4 - ' + (type === 'probability' ? 'Overvejende sandsynligt' : 'Høj'),
    },
    {
      value: 5,
      label:
        '5 - ' + (type === 'probability' ? 'Meget sandsynligt' : 'Meget høj'),
    },
  ];

  const selectedLabel = options.find(
    (option) => option.value === selectedValue,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <Button className="text-md w-full">
          {selectedLabel ? selectedLabel.label : label}
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
