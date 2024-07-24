'use client';

import { type User } from '@models';
import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex flex-col ">
        <span>{row.original.email}</span>
        <span className="text-Zinc-400 ">{row.original.jobDescription}</span>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'NAVN',
    cell: ({ row }) => (
      <div className="truncate">
        <span>{row.original.fullName}</span>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'ROLLE',
    cell: ({ row }) => (
      <div className="truncate">
        <span>{row.original.role}</span>
      </div>
    ),
  },
];
