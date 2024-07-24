'use client';

import { type User } from '@models';
import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Medarbejder email',
    cell: ({ row }) => (
      <div className="truncate">
        <span>{row.original.email}</span>
        <br />
        <span className="text-Zinc-400 break-words">
          {row.original.jobDescription}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Rolle',
    cell: ({ row }) => (
      <div className="truncate">
        <span className="text-Zinc-400 break-words">{row.original.role}</span>
      </div>
    ),
  },
];
