import { SingleDropdown } from '@components/ui';

interface PhaseDropdownProps {
  selectedValue: string | null;
  options: string[];
  setSelectedValue: (value: string | null) => void;
}

export function PhaseDropdown() {
  return (
    <SingleDropdown
      selectedValue={null}
      options={[]}
      buttonLabel={'Vælg fase'}
      setSelectedValue={function (value: string | null): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
}
