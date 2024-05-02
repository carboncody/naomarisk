'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

export function ActiveProjects() {
  return (
    <Dropdown className=" bg-white/25 text-white" placement="bottom-start">
      <DropdownTrigger>Active Projects</DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="settings">Project 1</DropdownItem>
        <DropdownItem key="team_settings">Project 2</DropdownItem>
        <DropdownItem key="settings">Project 3</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
