'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { Card, CardContent, CardTitle } from '@components/ui/card';
import { useEmployee } from '@lib/api/hooks/users/useEmployee';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import CompanySettings from './components/CompanySettings';
import { ProjectEmployeeChart } from './components/ProjectEmployeeChart';
import UserInfo from './components/UserInfo';

export function Employee() {
  const pathName = usePathname();
  const employeeEmail = pathName?.split('/employees/')[1];

  const {
    data: employee,
    isLoading,
    error,
    refetch,
  } = useEmployee({
    email: employeeEmail ? decodeURIComponent(employeeEmail) : '',
  });

  if (!employeeEmail) {
    return <Error statusCode={404} title="Employee not found in the url" />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error ?? !employee) {
    console.error(error);
    return <Error statusCode={500} title={'Noget gik galt!'} />;
  }

  return (
    <>
      <div className="flex w-full items-center justify-center gap-36 p-5">
        <div className="flex flex-col items-center justify-center gap-5">
          <Card className="border dark:border-transparent">
            <CardTitle className="p-5">{employee.fullName}</CardTitle>
            <CardContent> Position: {employee.role}</CardContent>
          </Card>
          <Card className="flex h-[200px] w-full items-center  justify-center ">
            <CardContent>
              <div>Profile picture</div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/3">
          <ProjectEmployeeChart employee={employee} />
        </div>
      </div>
      <hr className="m-5 h-px border-0 bg-zinc-300 dark:bg-zinc-700" />
      <div className=" flex w-full flex-col gap-5 p-5 md:flex-row">
        <UserInfo employee={employee} refetch={refetch} />
        <CompanySettings employee={employee} refetch={refetch} />
      </div>
    </>
  );
}
