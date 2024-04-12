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
        <DropdownItem href="/projects/project1" key="settings">
          Project 1
        </DropdownItem>
        <DropdownItem href="/projects/project2" key="team_settings">
          Project 2
        </DropdownItem>
        <DropdownItem href="/projects/project3" key="settings">
          Project 3
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
