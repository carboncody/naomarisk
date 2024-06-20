'use client';

import UserSettings from '@app/(navbar)/account/components/UserSettings';
import { Backbutton } from '@components/ui/BackButton';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { SettingsCard } from '@components/ui/SettingsCard';
import { useMe } from '@lib/api/hooks/users/useMe';
import { UserRole } from '@models';
import { Button, Link } from '@nextui-org/react';
import Error from 'next/error';
import { CompanySettings } from './components/CompanySetttings';

export function Account() {
  const { data: me, isLoading, error, refetch } = useMe();

  if (isLoading) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    <Error statusCode={500} message={'Noget gik galt!'} />;
  }

  if (!me) {
    return <Error statusCode={500} message={'Noget gik galt!'} />;
  }

  return (
    <div>
      <div className="flex w-full">
        <div className="mt-[100px] flex h-[500px] w-0 rounded-2xl bg-[#413e3e] md:w-1/2" />
        <div className="mt-[100px] flex w-full flex-col justify-center gap-y-5 px-4 md:w-1/2 md:px-10">
          <SettingsCard>
            <UserSettings me={me} refetchMe={refetch} />
          </SettingsCard>
          {me.role === UserRole.Owner && (
            <SettingsCard>
              <CompanySettings company={me.company} refetchMe={refetch} />
            </SettingsCard>
          )}
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
