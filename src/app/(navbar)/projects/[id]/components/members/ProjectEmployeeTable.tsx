'use client';

import { DataTable } from '@components/ui/data-table';
import { type ProjectUser, type User } from '@models';
import { useRouter } from 'next/navigation';
import { columns } from './colums';

interface ProjectEmployeeTableProps {
  projectEmployees: ProjectUser[];
  projectMemberIds: string[];
  employees: User[];
  projectID: string;
}

export function ProjectEmployeeTable({
  projectEmployees,
  employees,
}: ProjectEmployeeTableProps) {
  const router = useRouter();

  const handleRowClick = (pu: ProjectUser) => {
    const employee = employees.find((e) => e.email === pu.user.email);
    if (!employee) return;
    router.push(`/employees/${encodeURIComponent(employee.email)}`);
  };

  return (
    <DataTable
      columns={columns}
      data={projectEmployees}
      onRowClick={handleRowClick}
    />
  );
}
