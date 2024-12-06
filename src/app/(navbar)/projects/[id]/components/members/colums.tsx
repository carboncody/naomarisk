'use client';

import { Button } from '@components/ui/button';
import { type ProjectUser } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<ProjectUser>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="truncate">
        <span>{row.original.user.email}</span>
        <br />
        <span className="text-Zinc-400 dark:text-Zinc-800 break-words">
          {row.original.user.jobDescription}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Navn
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="truncate">
        <span>{row.original.user.fullName}</span>
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const nameA = rowA.original.user.fullName || '';
      const nameB = rowB.original.user.fullName || '';

      return nameA.localeCompare(nameB);
    },
  },
  {
    accessorKey: 'projectrole',
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'desc');
          }}
        >
          Projektrolle
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="truncate">
        <span className="text-Zinc-400 break-words">{row.original.role}</span>
      </div>
    ),
  },
];
