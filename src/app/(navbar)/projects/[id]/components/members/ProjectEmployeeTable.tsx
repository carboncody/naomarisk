'use client';

import { DataTable } from '@components/ui/data-table';
import { type User } from '@models';
import { useRouter } from 'next/navigation';
import { columns } from './colums';

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

  const handleRowClick = (employee: User) => {
    router.push(`/employees/${employee.id}`);
  };

  return (
    <div className="w-full">
      <DataTable columns={columns} data={rows} onRowClick={handleRowClick} />
    </div>
  );
}
