'use client';
import Error from 'next/error';
import { usePathname } from 'next/navigation';

export function Risk() {
  const pathName = usePathname();
  const employeeId = pathName?.split('/risk/')[1];

  if (!employeeId) {
    return <Error statusCode={404} title="risk not found in the url" />;
  }

  return (
    <>
      <div className="pt-20">
        <p>Risk ID: {JSON.stringify(employeeId)}</p>
      </div>
      <div></div>
    </>
  );
}
