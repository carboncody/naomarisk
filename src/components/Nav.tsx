import logo from '@assets/logoNaoma.svg';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { ActiveProjects } from './ActiveProjects';
import { SettingsDropdown } from './SettingsDropdown';
import NewPreojectDialog from './create/NewProjectDialog';

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
          <Link href={'/'} className="text-3xl">
            <Image
              src={logo as StaticImport}
              alt="logo"
              width={100}
              height={80}
              className="min-w-[40%] max-w-[60%] invert md:max-w-[100%]"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="justify-center gap-10 text-sm sm:flex md:text-lg"
        justify="center"
      >
        <NavbarItem>
          <NewPreojectDialog />
        </NavbarItem>
        <NavbarItem>
          <ActiveProjects />
        </NavbarItem>
        <NavbarItem>
          <Link href={'/allProjects'}>All Projects</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="gap-4 text-sm sm:flex md:text-lg" justify="end">
        <NavbarItem>
          <SettingsDropdown />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
