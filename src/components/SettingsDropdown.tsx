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
      <DropdownTrigger>Indstilling</DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem href="/account" key="settings">
          Mine Indstilling
        </DropdownItem>
        <DropdownItem href="/team" key="team_settings">
          Team Indstilling
        </DropdownItem>
        <DropdownItem key="logout" href="/auth/signout" color="danger">
          <button onClick={() => axios.post('/auth/signout')} type="submit">
            Log ud
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
