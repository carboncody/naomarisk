'use client';

import UserSettings from '@app/(navbar)/account/components/UserSettings';
import { SettingsCard } from '@components/ui/SettingsCard';
import { Button } from '@components/ui/button';
import { useMe } from '@lib/api/hooks/users/useMe';
import { UserRole } from '@models';
import Error from 'next/error';
import Link from 'next/link'; // Import Link from next/link
import { CompanySettings } from './components/CompanySetttings';
import { LoadingSpinner } from '@components/ui';

export function Account() {
  const { data: me, isLoading, error, refetch } = useMe();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[80vh]'>
        <LoadingSpinner size={50} />
      </div>
    );
  }

  if (error ?? !me) {
    return <Error statusCode={500} title={'Noget gik galt!'} />;
  }

  return (
    <div>
      <div className="flex w-full">
        <div className="dark:border-Zinc-300 ml-5 mt-[100px] flex h-[500px] w-0 rounded-2xl border dark:border-transparent dark:bg-zinc-900 md:w-1/2" />
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
      <div className="center ml-5 flex gap-4">
        <Link href="/">
          <Button>Tilbage</Button>
        </Link>
        <Button asChild>
          <Link href="/account/update-email">Ændre email</Link>
        </Button>
        <Button asChild>
          <Link href="/account/update-password">Ændre adgangskode</Link>
        </Button>
      </div>
    </div>
  );
}
