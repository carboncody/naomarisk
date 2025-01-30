'use client';

import { Button } from '@components/ui/button';
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
    <Button variant="icon" size="icon">
      <FaGear className="h-5 w-5 text-muted text-zinc-700 dark:text-white" />
    </Button>
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
      popoverClassName="min-w-[200px]"
      customTriggerBtn={triggerButton}
    />
  );
}
