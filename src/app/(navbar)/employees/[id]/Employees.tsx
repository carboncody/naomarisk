'use client';
import { Card, CardContent, CardTitle } from '@components/ui/card';
import { useMe } from '@lib/api/hooks/users/useMe';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import UserInfo from './components/UserInfo';

export function Employees() {
  const pathName = usePathname();
  const employeeId = pathName?.split('/employees/')[1];
  const { data: me, isLoading, error, refetch } = useMe();

  if (!employeeId) {
    return <Error statusCode={404} title="Employee not found in the url" />;
  }

  if (error ?? !me) {
    return <Error statusCode={500} title={'Noget gik galt!'} />;
  }

  return (
    <>
      <div className="flex w-full gap-5 p-5">
        <div className="w-1/3 gap-5 ">
          <Card className="mb-5 dark:bg-zinc-800">
            <CardTitle className="p-5">{me.fullName}</CardTitle>
            <CardContent> Position: {me.role}</CardContent>
          </Card>
          <Card className="flex h-[200px] items-center  justify-center dark:bg-zinc-800">
            <CardContent>
              <div>Profile picture</div>
            </CardContent>
          </Card>
        </div>
        <Card className="flex w-full items-center justify-center dark:bg-zinc-800">
          <CardContent>
            <div>Antal projekter</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-5 w-1/2 p-5">
        <UserInfo me={me} refetchMe={refetch} />
      </div>
    </>
  );
}
