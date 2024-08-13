'use client';

import { Button } from '@components/ui/button';
import { type Project } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Projekt Navn
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
    accessorKey: 'risks.length',
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Risicifordeling
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="truncate">
        <span className="flex gap-2">
          <p className="text-red-400">
            {
              row.original.risks.filter(
                (risk) => risk.probability * risk.consequence > 15,
              ).length
            }
          </p>
          /{' '}
          <p className="text-yellow-400">
            {
              row.original.risks.filter(
                (risk) =>
                  risk.probability * risk.consequence > 4 &&
                  risk.probability * risk.consequence <= 15,
              ).length
            }
          </p>
          /{' '}
          <p className="text-green-400">
            {
              row.original.risks.filter(
                (risk) => risk.probability * risk.consequence < 5,
              ).length
            }
          </p>
          <p></p>
        </span>
      </div>
    ),
  },
  // const open = project.risks.filter(
  //   (risk) => risk.status === RiskStatus.Open,
  // ).length;
  {
    accessorKey: 'risks.length',
    header: ({ column }) => {
      return (
        <Button
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Totlat antal risici
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="truncate">
        <span>{row.original.risks.length}</span>
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="truncate">
        <span>
          {dayjs(row.original.createdAt).format('kl. HH:MM - DD MMM')}
        </span>
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="truncate">
        <span>
          {dayjs(row.original.updatedAt).format('kl. HH:MM - DD MMM')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'period',
    header: 'Periode',
    cell: ({ row }) => (
      <div className="truncate">
        <span className="flex items-center gap-1">
          {dayjs(row.original.startDate).format('DD MMM')}
          <span className="text-Zinc-400">-</span>
          {row.original.dueDate ? (
            dayjs(row.original.dueDate).format('DD MMM')
          ) : (
            <p className="text-Zinc-400">No due date</p>
          )}
        </span>
      </div>
    ),
  },
];
