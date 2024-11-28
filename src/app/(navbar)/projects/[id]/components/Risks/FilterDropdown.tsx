import { SingleDropdown } from '@components/ui';
import { type RiskStatus } from '@models';

// enum Riskfilter {
//   Owner
//   Description

// }

interface FilterDropdownProps {
  status?: RiskStatus;
  riskowner: string[];
}

export function FilterDropdown({ riskowner }: FilterDropdownProps) {
  const options = [
    ...riskowner.map((id) => ({ label: `Risk Owner: ${id}`, value: id })),
  ];

  return (
    <SingleDropdown
      selectedValue={null}
      options={options}
      buttonLabel="Tilføj Filter"
      setSelectedValue={(value: string | null) => {
        console.log('Selected filter value:', value);
      }}
    />
  );
}
