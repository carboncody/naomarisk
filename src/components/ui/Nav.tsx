import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import Link from 'next/link';
import { SettingsDropdown } from './SettingsDropdown';

export function Nav() {
  // TODO : fix this!
  // const me = useMe();
  // const isAdmin = me.role === UserRole.Owner || me.role === UserRole.Manager;

  return (
    <Navbar
      className="sticky h-10 w-full bg-white/10 text-white backdrop-blur-md md:h-16"
      classNames={{
        wrapper: 'max-w-[2024px]',
      }}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href={'/'}>
            <span className="bg-gradient-to-br from-white via-amber-50 to-amber-200 bg-clip-text text-xl font-medium text-transparent md:text-2xl">
              Naoma Risk
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center">
        {
          <NavbarItem>
            <Link href={'/projects?status=all'}>
              <Button
                disableAnimation
                className="text-md bg-transparent text-white"
              >
                Alle Projekter
              </Button>
            </Link>
          </NavbarItem>
        }
        <NavbarItem>
          <Link href={'/projects'}>
            <Button
              disableAnimation
              className="text-md bg-transparent text-white"
            >
              Mine Projekter
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
