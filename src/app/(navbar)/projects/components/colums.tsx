'use client';

import { type Project } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'name',
    header: 'NAVN',
    cell: ({ row }) => (
      <div className="flex flex-col ">
        <span>{row.original.name}</span>
        <span className="text-Zinc-400 ">{row.original.description}</span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'OPRETTET',
    cell: ({ row }) => (
      <div className="truncate">
        <span>
          {dayjs(row.original.createdAt).format('kl. HH:MM - DD MMM')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'risks.length',
    header: 'RISKS',
    cell: ({ row }) => (
      <div className="truncate">
        <span>{row.original.risks.length}</span>
      </div>
    ),
  },
  {
    accessorKey: 'period',
    header: 'PERIODE',
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
