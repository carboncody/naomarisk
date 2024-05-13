'use client';

import UserSettings from '@components/UserSettings/UserSettings';
import { Backbutton } from '@components/ui/BackButton';
import { SettingsCard } from '@components/ui/SettingsCard';
import { User } from '@lib/api/hooks';
import { Button, Link } from '@nextui-org/react';

export default function Account() {
  const { data: error, refetch } = User();
  return (
    <div>
      <div className="flex w-full">
        <div className="mt-[100px] flex h-[500px] w-0 rounded-2xl bg-[#413e3e] md:w-1/2" />
        <div className="mt-[100px] flex w-full flex-col justify-center gap-y-5 px-4 md:w-1/2 md:px-10">
          <SettingsCard>
            <UserSettings refetch={refetch} />
          </SettingsCard>
          <>
            {/* {isAdmin && ( */}
            {/* <SettingsCard> */}
            {/* <CompanySettings /> */}
            {/* </SettingsCard> */}
            {/* )} */}
          </>
        </div>
      </div>
      <div className="center flex gap-4">
        <Backbutton href={'/'} />
        <Link href="/account/update-email">
          <Button>Ændre email</Button>
        </Link>
        <Link href="/account/update-password">
          <Button>Ændre adgangskode</Button>
        </Link>
      </div>
    </div>
  );
}
