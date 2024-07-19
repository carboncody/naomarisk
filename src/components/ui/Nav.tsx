'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { SettingsDropdown } from './SettingsDropdown';

export function Nav() {
  // TODO : fix this!
  // const me = useMe();
  // const isAdmin = me.role === UserRole.Owner || me.role === UserRole.Manager;

  return (
    <NavigationMenu className="sticky top-0 z-50 h-10 w-full bg-white/10 text-white backdrop-blur-md md:h-16">
      <NavigationMenuList className="flex w-full items-center justify-between">
        <NavigationMenuItem>
          <Link href="/" passHref legacyBehavior>
            <NavigationMenuLink className="bg-gradient-to-br from-white via-amber-50 to-amber-200 bg-clip-text text-xl font-medium text-transparent md:text-2xl">
              Naoma Risk
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <div className="flex justify-center">
          <NavigationMenuItem>
            <Link href="/projects?status=all" passHref legacyBehavior>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Alle Projekter
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/projects" passHref legacyBehavior>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Mine Projekter
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/employees" passHref legacyBehavior>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Medarbejdere
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>

        <NavigationMenuItem>
          <SettingsDropdown />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
