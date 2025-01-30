'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type User } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { GoSortAsc, GoSortDesc } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';

interface ColumnParams {
  handleEdit: (employee: User) => void;
}

export const columns = ({ handleEdit }: ColumnParams): ColumnDef<User>[] => [
  {
    accessorKey: 'profilePicture',
    header: 'Profilbillede',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          {/* {profilePictureUrl ? (
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={profilePictureUrl}
              alt={`${row.original.fullName}'s profile`}
              width={40} // Adjust width and height as needed
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            )} */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
            <span className="text-2xl text-black">
              <RxCross1 />
            </span>
          </div>
        </div>
      );
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
        <span>{row.original.fullName}</span>
      </div>
    ),
    // Updated sorting function to sort by fullName directly
    sortingFn: (rowA, rowB) => {
      const nameA = rowA.original.fullName || ''; // Access fullName directly
      const nameB = rowB.original.fullName || ''; // Access fullName directly

      return nameA.localeCompare(nameB); // Compare full names
    },
  },
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
      <div className="flex flex-col ">
        <span>{row.original.email}</span>
        <span className="text-Zinc-400">{row.original.jobDescription}</span>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rolle
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
        USER: 'Medarbejder',
        OWNER: 'Ejer',
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
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
              variant="ghost"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem onClick={() => handleEdit(employee)}>
              Rediger
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
