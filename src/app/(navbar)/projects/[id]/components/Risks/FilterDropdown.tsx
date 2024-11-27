import { SingleDropdown } from '@components/ui';
import { type RiskStatus } from '@models';

enum Riskfilter {
  Owner
  Description
  
}


interface FilterDropdownProps {
  status?: RiskStatus;
  riskOwnerIds: string[];
}


export function FilterDropdown({ status, riskOwnerIds }: FilterDropdownProps) {
  const options = [
    ...riskOwnerIds.map((id) => ({ label: `Risk Owner ID: ${id}`, value: id })),
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
