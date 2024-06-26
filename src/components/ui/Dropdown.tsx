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
    <NextDropdown className="bg-[#413e3e] text-white" placement="bottom-start">
      <DropdownTrigger className="text-md">
        {customTriggerBtn ?? (
          <Button color="default" className="text-md">
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : buttonLabel}
          </Button>
        )}
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
