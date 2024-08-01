'use client';

import { Button } from '@components/ui/button';
import { type User } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rolle
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="truncate">
        <span className="text-Zinc-400 break-words">{row.original.role}</span>
      </div>
    ),
  },
];
