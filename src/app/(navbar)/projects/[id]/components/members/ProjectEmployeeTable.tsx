import { Table } from '@components/Table';
import { sortBy } from '@components/Table/sorting/sort.utils';
import { type TableColumns } from '@components/Table/types/table.columns';
import { type User } from '@models';
import { useRouter } from 'next/navigation';

interface ProjectEmployeeTableProps {
  projectMemberIds: string[];
  employees: User[];
}

export function ProjectEmployeeTable({
  employees,
  projectMemberIds,
}: ProjectEmployeeTableProps) {
  const rows: User[] = employees.filter((employee) => {
    return projectMemberIds.includes(employee.id);
  });
  const router = useRouter();

  const columns: TableColumns<User> = {
    email: {
      title: 'Medarbejder email',
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
      title: 'Rolle',
      spacing: 2,
      render: (employee: User) => (
        <div className="truncate">
          <span className="break-words text-gray-400">{employee.role}</span>
        </div>
      ),
    },
  };

  return (
    <Table
      onRowClick={(employee) => router.push(`/employees/${employee.id}`)}
      columns={columns}
      rows={rows}
      applyMinWidth={false}
    />
  );
}
