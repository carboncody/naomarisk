// ReusableDropdown.jsx
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown as NextDropdown,
} from '@nextui-org/react';
import { type ReactNode } from 'react';

interface BaseOption {
  label: ReactNode;
  value: string;
  href?: string;
}

interface SingleDropdownProps {
  selectedValue?: string;
  options: BaseOption[];
  buttonLabel: ReactNode;
  setSelectedValue: (value: string) => void;
}

export function SingleDropdown({
  buttonLabel,
  selectedValue,
  setSelectedValue,
  options,
}: SingleDropdownProps) {
  return (
    <NextDropdown className="bg-[#413e3e] text-white" placement="bottom-start">
      <DropdownTrigger className='text-md'>
        <Button disableAnimation className="text-md bg-transparent text-white">
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : buttonLabel}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        aria-label="User Actions"
        variant="flat"
      >
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            href={option.href}
            onClick={() => setSelectedValue(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </NextDropdown>
  );
}
