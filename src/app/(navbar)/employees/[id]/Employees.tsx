'use client';
import Error from 'next/error';
import { usePathname } from 'next/navigation';

export function Employees() {
  const pathName = usePathname();
  const employeeIdIndex = pathName?.split('/').indexOf('employees') + 1;
  const employeeId = pathName?.split('/')[employeeIdIndex];

  if (!employeeId) {
    return <Error statusCode={404} title="Employee not found in the url" />;
  }

  return (
    <>
      <p>Employee ID: {JSON.stringify(employeeId)}</p>
    </>
  );
}
