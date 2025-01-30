'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ThemeSwitcher } from './abstractions/buttons/ThemeSwitcher';
import { SettingsDropdown } from './abstractions/dropdowns/SettingsDropdown';

export function Nav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleProceed = () => {
    setOpen(false);
    void router.push('/csm');
  };

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

        <div className="flex items-center justify-center space-x-5">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Projektledelse</NavigationMenuTrigger>
            <NavigationMenuContent className="p-2">
              <span className="pb-1 pl-3">Risikovurdering:</span>
              <ul className="grid w-[200px]">
                <ListItem
                  href="/projects?status=all"
                  title="Alle Projekter"
                  className="hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  Her ses alle projekter i firmaet
                </ListItem>
                <ListItem
                  href="/projects"
                  title="Mine Projekter"
                  className="hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  Her ses alle projekter du er tildelt til
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/employees" passHref legacyBehavior>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Medarbejdere
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <span>|</span>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild className="cursor-pointer">
                <NavigationMenuLink
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                  className={navigationMenuTriggerStyle()}
                >
                  <span className="text-red-600">C</span>SM
                </NavigationMenuLink>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-red-500">
                <AlertDialogHeader>
                  <AlertDialogTitle>Forsæt til Naoma CSM?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Denne del af web-applikationen er ikke færdig og viser
                    eksempler på hvordan det kunne se ud.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Luk</AlertDialogCancel>
                  <AlertDialogAction onClick={handleProceed}>
                    Forsæt
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
