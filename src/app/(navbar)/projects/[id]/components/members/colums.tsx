'use client';

import { Button } from '@components/ui/button';
import { type ProjectUser } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import { GoSortAsc, GoSortDesc } from 'react-icons/go';

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
          {column.getIsSorted() === 'asc' ? (
            <GoSortAsc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <GoSortDesc className="ml-2 h-4 w-4" />
          ) : (
            <GoSortDesc className="ml-2 h-4 w-4 opacity-0" />
          )}
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
    sortingFn: (rowA, rowB) => {
      const emailA = rowA.original.user.email || '';
      const emailB = rowB.original.user.email || '';

      return emailA.localeCompare(emailB);
    },
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
          {column.getIsSorted() === 'asc' ? (
            <GoSortAsc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <GoSortDesc className="ml-2 h-4 w-4" />
          ) : (
            <GoSortDesc className="ml-2 h-4 w-4 opacity-0" />
          )}
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
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Projektrolle
          {column.getIsSorted() === 'asc' ? (
            <GoSortAsc className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <GoSortDesc className="ml-2 h-4 w-4" />
          ) : (
            <GoSortDesc className="ml-2 h-4 w-4 opacity-0" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const roleMapping: Record<string, string> = {
        MANAGER: 'Projektleder',
        MEMBER: 'Medarbejder',
      };

      const role = row.original.role;
      const translatedRole = roleMapping[role] ?? role;

      return (
        <div className="truncate">
          <span className="text-Zinc-400 break-words">{translatedRole}</span>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const roleA = rowA.original.role || '';
      const roleB = rowB.original.role || '';

      return roleA.localeCompare(roleB);
    },
  },
];
