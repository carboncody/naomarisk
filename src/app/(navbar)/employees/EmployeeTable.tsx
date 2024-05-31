import { Table } from '@components/Table';
import { sortBy } from '@components/Table/sorting/sort.utils';
import { type TableColumns } from '@components/Table/types/table.columns';
import { type User } from '@models';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteEmployee from './components/DeleteEmployee';

interface EmployeeTableProps {
  employee: User[];
  refetch: () => void;
}

export function EmployeeTable({ employee, refetch }: EmployeeTableProps) {
  const rows: User[] = employee;
  const [EmployeeBeingEdited, setEmployeeBeingEdited] = useState<User | null>(null);

  const columns: TableColumns<User> = {
    email: {
      title: 'Email',
      spacing: 2,
      render: (employee: User) => (
        <div className="truncate">
          <span>{employee.email}</span>
          <br />
          <span className="break-words text-gray-400">
            {employee.jobDescription}
          </span>
        </div>
      ),
      sort: sortBy('string'),
    },
    role: {
      title: 'ROLLE',
      spacing: 2,
      render: (employee: User) => (
        <div className="truncate">
          <span className="break-words text-gray-400">{employee.role}</span>
        </div>
      ),
    },
  };

  return (
    <>
    <Table
      onRowClick={(employee) => setEmployeeBeingEdited(employee)}
      columns={columns}
      rows={rows}
      />

    {EmployeeBeingEdited && (
      <DeleteEmployee
        isOpen={!!EmployeeBeingEdited}
        employee={EmployeeBeingEdited}
        setEmployeeBeingEdited={setEmployeeBeingEdited}
        refetch={refetch}
        />
      )}
      </>
  );
}
