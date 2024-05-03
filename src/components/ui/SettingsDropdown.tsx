'use client';

import { SingleDropdown } from './Dropdown';

export function SettingsDropdown() {
  const settingsActionDropdownOptions = [
    {
      label: 'Bruger instillinger',
      href: '/account',
      value: 'settings',
    },
    {
      label: 'Log ud',
      href: '/auth/signout',
      value: 'logout',
    },
  ];
  return (
    <SingleDropdown
      selectedValue={''}
      options={settingsActionDropdownOptions}
      buttonLabel={'Indstillinger'}
      setSelectedValue={(value) => {
        if (value === 'logout') {
        }
      }}
    />
  );
}
