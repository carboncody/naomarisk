'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

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
        <DropdownItem key="logout" color="danger">
          <form className="block" action="/auth/signout" method="post">
            <button type="submit">Sign out</button>
          </form>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
