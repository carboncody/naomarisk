'use client';

import { FaGear } from 'react-icons/fa6';
import { SingleDropdown } from './Dropdown';

export function SettingsDropdown() {
  const settingsActionDropdownOptions = [
    {
      label: 'Indstillinger',
      href: '/account',
      value: 'settings',
    },
    {
      label: 'Log ud',
      href: '/auth/signout',
      value: 'logout',
    },
  ];

  const triggerButton = (
    <button className="outline-none">
      <FaGear className="h-5 w-5 text-amber-500 dark:text-amber-200" />
    </button>
  );

  return (
    <SingleDropdown
      selectedValue={''}
      options={settingsActionDropdownOptions}
      buttonLabel={'Indstillinger'}
      setSelectedValue={(value) => {
        if (value === 'logout') {
        }
      }}
      customTriggerBtn={triggerButton}
    />
  );
}
