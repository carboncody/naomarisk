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
  return (
    <NavigationMenu className="sticky top-0 z-50 h-12 w-screen bg-zinc-200 backdrop-blur-md dark:bg-zinc-800 dark:text-white">
      <NavigationMenuList className="flex w-screen items-center justify-between">
        <div className="ml-3 flex items-center gap-2">
          <ThemeSwitcher />
          <NavigationMenuItem>
            <Link href="/" passHref legacyBehavior>
              <NavigationMenuLink className="bg-gradient-to-br from-black via-amber-400 to-amber-600 bg-clip-text text-xl font-medium text-transparent dark:from-white dark:via-amber-50 dark:to-amber-200 md:text-2xl">
                NaomaRisk
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>

        <div className="flex items-center justify-center  space-x-5">
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

        <div className="flex w-[170px] items-center justify-end pr-3">
          <NavigationMenuItem>
            <SettingsDropdown />
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
