import logo from '@assets/logoNaoma.svg';
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import NewProjectDialog from '../create/NewProjectDialog';
import { ActiveProjectsDropdown } from './ActiveProjectsDropdown';
import { SettingsDropdown } from './SettingsDropdown';

export function Nav() {
  return (
    <Navbar
      className="absolute h-10 w-full bg-white/10 text-white backdrop-blur-md md:h-16"
      classNames={{
        wrapper: 'max-w-[2024px]',
      }}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href={'/'}>
            <Image
              src={logo as StaticImport}
              alt="logo"
              width={90}
              className="invert"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className='left-[500px]' justify="start">
        <NavbarItem>
          <NewProjectDialog />
        </NavbarItem>
        <NavbarItem>
          <ActiveProjectsDropdown />
        </NavbarItem>
        <NavbarItem>
          <Link href={'/projects'}>
            <Button
              disableAnimation
              className="text-md bg-transparent text-white"
            >
              Alle Projekter
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={'/employees'}>
            <Button
              disableAnimation
              className="text-md bg-transparent text-white"
            >
              Medarbejdere
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="gap-4 sm:flex md:text-lg" justify="end">
        <NavbarItem>
          <SettingsDropdown />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
