'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import axios from 'axios';

export function SettingsDropdown() {
  return (
    <Dropdown className=" bg-white/25 text-white" placement="bottom-start">
      <DropdownTrigger>Settings</DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem href="/account" key="settings">
          My Settings
        </DropdownItem>
        <DropdownItem href="/team" key="team_settings">
          Team Settings
        </DropdownItem>
        <DropdownItem key="logout" href="/auth/signout" color="danger">
          <button onClick={() => axios.post('/auth/signout')} type="submit">
            Sign out
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
