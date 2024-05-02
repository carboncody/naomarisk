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
      <DropdownTrigger>Aktive Projekter</DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="settings">Projekt 1</DropdownItem>
        <DropdownItem key="team_settings">Projekt 2</DropdownItem>
        <DropdownItem key="settings">Projekt 3</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
