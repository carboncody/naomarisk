'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { type User } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

interface ColumnParams {
  handleEdit: (employee: User) => void;
}

export const columns = ({ handleEdit }: ColumnParams): ColumnDef<User>[] => [
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
      <div className="flex flex-col ">
        <span>{row.original.email}</span>
        <span className="text-Zinc-400">{row.original.jobDescription}</span>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header:'Navn',
    
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
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(employee)}>
              Rediger
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
