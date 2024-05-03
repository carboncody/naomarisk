'use client';

import InviteEmployee from '@components/invite/InviteEmployee';
import { User } from '@lib/api/hooks';
import { Button, Spinner } from '@nextui-org/react';
import Error from 'next/error';
import Link from 'next/link';
import { useState } from 'react';
import { EmployeeTable } from './EmployeeTable';

export function AllEmployees() {
  const [isNewOpen, setIsNewOpen] = useState(false);

  const { data: allEmployees, isFetching, isError, error, refetch } = User();

  if (isFetching) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    <Error statusCode={500} message={error.message} />;
  }

  return (
    <>
      <div className="justify-top flex min-h-screen flex-col items-center bg-gradient-to-b  from-[#1c1c1c] to-[#2a2929] text-white">
        <div className="mb-4 w-full mt-40 flex justify-between">
          <p className="text-3xl font-semibold">Alle Medarbejdere</p>
          <Button className="w-32" onClick={() => setIsNewOpen(true)}>
            Tilføj
          </Button>
        </div>
        <div className="h-full w-3/4 ">
          <EmployeeTable employee={allEmployees ?? []} />
        </div>
        <div className=" justify-flex flex justify-center">
          <Link className="block w-full p-3" href="/">
            <Button>Tilbage</Button>
          </Link>
        </div>
      </div>
      {isNewOpen && (
        <InviteEmployee isOpen={isNewOpen} setIsOpen={setIsNewOpen} refetch={refetch} />
      )}
    </>
  );
}
