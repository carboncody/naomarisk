'use client';

import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { type CsmProject } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { MoreHorizontal } from 'lucide-react';
import { GoSortAsc, GoSortDesc } from 'react-icons/go';

interface ColumnParams {
  setEditingProjectId: (id: string | null) => void;
}

export const columns = ({
  setEditingProjectId,
}: ColumnParams): ColumnDef<CsmProject>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          CSM Projekt Navn
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
        <span>{row.original.name}</span>
        <span className="text-Zinc-400 ">{row.original.description}</span>
      </div>
    ),
  },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Oprettet
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
        <span>{dayjs(row.original.createdAt).format('DD MMM YY')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Sidst opdateret
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
        <span>{dayjs(row.original.updatedAt).format('DD MMM YY')}</span>
      </div>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const project = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem
              className="group-hover:bg-red-500 group-hover:text-white dark:group-hover:bg-red-400"
              onClick={() => setEditingProjectId(project.id)}
            >
              Rediger Projekt
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
