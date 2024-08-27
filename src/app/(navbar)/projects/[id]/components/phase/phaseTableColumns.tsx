'use client';

import { Button } from '@/components/ui/button';
import type { Phase, Risk } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown } from 'lucide-react';

interface ColumnParams {
  projectId: string;
  risks: Risk[];
}

export const phaseTableColumns = ({
  risks,
}: ColumnParams): ColumnDef<Phase>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fase
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original: phase } }) => {
      return (
        <div className="flex items-center justify-between truncate text-black dark:text-white">
          <span>{phase.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'phase',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Risici
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original: phase } }) => {
      const projectRisks = phase.projectRisks;
    },
  },
  {
    accessorKey: 'phase',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Mitigerende risici
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original: phase } }) => {
      return (
        <div className="col-span-2 flex items-center justify-between truncate text-black dark:text-white">
          {/* <span>{phase.mitigationRisks.length}</span> */}
        </div>
      );
    },
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Startdato - Slutdato
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original: phase } }) => {
      return (
        <span>
          {dayjs(phase.startDate).format('DD MMM YY')} -{' '}
          {dayjs(phase.endDate).format('DD MMM YY')}
        </span>
      );
    },
  },
];
