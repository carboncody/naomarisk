'use client';

import InviteEmployee from '@app/(navbar)/employees/components/InviteEmployeeModal';
import { Backbutton } from '@components/ui/BackButton';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { useEmployees } from '@lib/api/hooks';
import { Button } from '@nextui-org/react';
import Error from 'next/error';
import { useState } from 'react';
import { EmployeeTable } from './EmployeeTable';

export function AllEmployees() {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    data: allEmployees,
    isFetching,
    isError,
    error,
    refetch,
  } = useEmployees();

  if (isFetching) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    <Error statusCode={500} message={error.message} />;
  }

  return (
    <>
      <div className="justify-top flex min-h-screen flex-col items-center px-8 text-white">
        <div className="mb-4 mt-40 flex w-full justify-between">
          <p className="text-3xl font-semibold">Alle Medarbejdere</p>
          <div className="flex gap-4">
            <Button className="w-32" onClick={() => setIsNewOpen(true)}>
              Tilføj
            </Button>
          </div>
        </div>
        <EmployeeTable employee={allEmployees ?? []} refetch={refetch} />
        <div className=" justify-flex flex justify-center">
          <Backbutton href={'/'} />
        </div>
      </div>
      {isNewOpen && (
        <InviteEmployee
          isOpen={isNewOpen}
          setIsOpen={setIsNewOpen}
          refetch={refetch}
        />
      )}
    </>
  );
}
