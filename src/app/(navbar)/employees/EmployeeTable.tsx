import { Table } from '@components/Table';
import { sortBy } from '@components/Table/sorting/sort.utils';
import { type TableColumns } from '@components/Table/types/table.columns';
import { type User } from '@models';
import { useState } from 'react';
import EditEmployeeModal from './components/EditEmployeeModal';

interface EmployeeTableProps {
  employee: User[];
  refetch: () => void;
}

export function EmployeeTable({ employee, refetch }: EmployeeTableProps) {
  const rows: User[] = employee;
  const [employeeBeingEdited, setEmployeeBeingEdited] = useState<User | null>(
    null,
  );

  const columns: TableColumns<User> = {
    email: {
      title: 'Email',
      spacing: 2,
      render: (employee: User) => (
        <div className="truncate">
          <span>{employee.email}</span>
          <br />
          <span className="break-words text-gray-200">
            {employee.jobDescription}
          </span>
        </div>
      ),
      // sort: sortBy('string'),
    },
    fullName: {
      title: 'NAVN',
      spacing: 2,
      render: (employee: User) => (
        <div className="truncate">
          <span>{employee.fullName}</span>
          <br />
          <span className="break-words text-gray-200">
            {employee.jobDescription}
          </span>
        </div>
      ),
      sort: sortBy('string'),
    },
    role: {
      title: 'ROLLE',
      spacing: 1,
      render: (employee: User) => (
        <div className="truncate">
          <span className="break-words text-gray-200">{employee.role}</span>
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
