import { Table } from '@components/Table';
import { sortBy } from '@components/Table/sorting/sort.utils';
import { type TableColumns } from '@components/Table/types/table.columns';
import { type User } from '@models';
import { useRouter } from 'next/navigation';

export function EmployeeTable({ employee }: { employee: User[] }) {
  const rows: User[] = employee;
  const router = useRouter();

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
      // sort: sortBy('date'),
    },
  };

  return (
    <Table
      onRowClick={(employee) => router.push(`/employees/${employee.id}`)}
      columns={columns}
      rows={rows}
    />
  );
}
