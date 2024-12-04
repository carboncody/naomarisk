'use client';

import { DataTable } from '@components/ui/data-table';
import { type ProjectUser, type User } from '@models';
import { useRouter } from 'next/navigation';
import { columns } from './colums';

interface ProjectEmployeeTableProps {
  projectEmployees: ProjectUser[];
  projectMemberIds: string[];
  employees: User[];
}

export function ProjectEmployeeTable({
  employees,
  projectMemberIds,
  projectEmployees,
}: ProjectEmployeeTableProps) {
  const rows: User[] = employees
    .filter((employee) => projectMemberIds.includes(employee.id))
    .map((employee) => {
      const projectUser = projectEmployees.find(
        (projectEmployee) => projectEmployee.userId === employee.id,
      );

      return {
        ...employee,
        role: projectUser?.role,
      };
    });

  const router = useRouter();

  const handleRowClick = (employee: User) => {
    router.push(`/employees/${encodeURIComponent(employee.email)}`);
  };

  return (
    <div className="w-full">
      <DataTable columns={columns} data={rows} onRowClick={handleRowClick} />
    </div>
  );
}
