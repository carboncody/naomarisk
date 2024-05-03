'use client';

import { SingleDropdown } from './Dropdown';

export function ActiveProjectsDropdown() {
  const activeProjectsActionDropdownOptions = [
    {
      label: 'Projekt 1',
      href: '/projects/1',
      value: '1',
    },
    {
      label: 'Projekt 2',
      href: '/projects/2',
      value: '2',
    },
    {
      label: 'Projekt 3',
      href: '/projects/3',
      value: '3',
    },
  ];
  return (
    <SingleDropdown
      selectedValue={''}
      options={activeProjectsActionDropdownOptions}
      buttonLabel={'Aktive Projekter'}
      setSelectedValue={(value) => {
        if (value === '2') {
        }
      }}
    />
  );
}
