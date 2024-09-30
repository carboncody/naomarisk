'use client';

import EditEmployeeModal from '@app/(navbar)/employees/components/EditEmployeeModal';
import InviteEmployee from '@app/(navbar)/employees/components/InviteEmployeeModal';
import { LoadingSpinner } from '@components/ui/LoadSpinner';
import { Button } from '@components/ui/button';
import { DataTable } from '@components/ui/data-table';
import { useEmployees } from '@lib/api/hooks';
import { type User } from '@models';
import Error from 'next/error';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { columns as getColumns } from './components/colums';

export function AllEmployees() {
  const router = useRouter();

  const [isNewOpen, setIsNewOpen] = useState(false);
  const [employeeBeingEdited, setEmployeeBeingEdited] = useState<User | null>(
    null,
  );

  const {
    data: allEmployees,
    isFetching,
    isRefetching,
    isError,
    error,
    refetch,
  } = useEmployees();

  if (isFetching && !isRefetching) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <Error statusCode={500} message={error.message} />;
  }

  const handleEdit = (employee: User) => {
    setEmployeeBeingEdited(employee);
  };

  const handleRowClick = (employee: User) => {
    router.push(`/employees/${encodeURIComponent(employee.email)}`);
  };

  return (
    <>
      <div className="justify-top flex min-h-screen flex-col items-center px-8 dark:text-white">
        <div className="mb-4 mt-10 flex w-full justify-between">
          <p className="text-3xl font-semibold">Alle Medarbejdere</p>
          <div className="flex gap-4">
            <Button onClick={() => setIsNewOpen(true)}>Tilføj</Button>
          </div>
        </div>
        <div className="w-full rounded-xl border p-4 dark:border-transparent dark:bg-zinc-900">
          <DataTable
            data={allEmployees ?? []}
            columns={getColumns({ handleEdit })}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
      {isNewOpen && (
        <InviteEmployee
          isOpen={isNewOpen}
          setIsOpen={setIsNewOpen}
          refetch={refetch}
        />
      )}
      {employeeBeingEdited && (
        <EditEmployeeModal
          isOpen={!!employeeBeingEdited}
          employee={employeeBeingEdited}
          setEmployeeBeingEdited={setEmployeeBeingEdited}
          refetch={refetch}
        />
      )}
    </>
  );
}
