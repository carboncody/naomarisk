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
import { ThemeSwitcher } from './ThemeSwitcher';

export function Nav() {
  // TODO : fix this!
  // const me = useMe();
  // const isAdmin = me.role === UserRole.Owner || me.role === UserRole.Manager;

  return (
    <NavigationMenu className="sticky top-0 z-50 h-10 w-full bg-zinc-200 backdrop-blur-md dark:bg-zinc-900 dark:text-white md:h-16">
      <NavigationMenuList className="flex w-full items-center justify-between gap-5">
        <ThemeSwitcher />
        <NavigationMenuItem>
          <Link href="/" passHref legacyBehavior>
            <NavigationMenuLink className="bg-gradient-to-br from-black via-amber-400 to-amber-600 bg-clip-text text-xl font-medium text-transparent dark:from-white dark:via-amber-50 dark:to-amber-200 md:text-2xl">
              nRisk
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <div className="flex justify-between">
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
