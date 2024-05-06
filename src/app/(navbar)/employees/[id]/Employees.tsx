'use client';
import Error from 'next/error';
import { usePathname } from 'next/navigation';

export function Employees() {
  const pathName = usePathname();
  const employeeId = pathName?.split('/employees/')[1];

  if (!employeeId) {
    return <Error statusCode={404} title="Employee not found in the url" />;
  }

  return (
    <>
      <div className="pt-20">
        <p>Employee ID: {JSON.stringify(employeeId)}</p>
      </div>
      <div></div>
    </>
  );
}
