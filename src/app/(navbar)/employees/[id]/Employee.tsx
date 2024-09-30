'use client';

import { LoadingSpinner } from '@components/ui/LoadSpinner';
import { useEmployee } from '@lib/api/hooks/users/useEmployee';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import CompanySettings from './components/CompanySettings';
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
      <div className="justify-left flex w-full items-center  p-5">
        <span className="text-3xl font-medium">Instillinger for brugeren:</span>
        <span className="text-3xl font-light">{employee.fullName}</span>
      </div>
      <div className=" flex w-full flex-col gap-5 p-5 md:flex-row">
        <UserInfo employee={employee} refetch={refetch} />
        <CompanySettings employee={employee} refetch={refetch} />
      </div>
    </>
  );
}
