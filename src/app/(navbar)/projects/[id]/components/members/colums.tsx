'use client';

import { Button } from '@components/ui/button';
import { ProjectRole, type User } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

// Define the role mapping
const roleMapping: { [key in ProjectRole]: string } = {
  [ProjectRole.MANAGER]: 'Projektleder',
  [ProjectRole.MEMBER]: 'Medarbejder',
};

export const columns: ColumnDef<User>[] = [
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
        <span>{row.original.email}</span>
        <br />
        <span className="text-Zinc-400 break-words">
          {row.original.jobDescription}
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
        <span>{row.original.fullName}</span>
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const nameA = rowA.original.fullName || '';
      const nameB = rowB.original.fullName || '';

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
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Projektrolle
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="truncate">
        <span className="text-Zinc-400 break-words">
          {roleMapping[row.original.role as unknown as ProjectRole] ??
            'Ingen rolle'}
        </span>
      </div>
    ),
  },
];
