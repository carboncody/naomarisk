'use client';

import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@components/ui/hover-card';
import { cn } from '@lib/utils';
import { RiskStatus, type Project } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ColumnParams {
  handleArchive: (project: Project) => void;
  // handleEdit: (project: Project) => void;
}

export const columns = ({
  handleArchive,
  // handleEdit,
}: ColumnParams): ColumnDef<Project>[] => [
  {
    accessorKey: 'riskScore',
    header: () => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent dark:hover:bg-transparent"
          // onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Åbne risici
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      );
    },
    cell: ({ row }) => {
      let circleColor = 'bg-gray-400';

      const openRisks = row.original.risks.filter(
        (risk) => risk.status === RiskStatus.Open,
      );

      if (openRisks.length > 0) {
        const highRiskCount = openRisks.filter(
          (risk) => (risk.probability ?? 0) * (risk.consequence ?? 0) > 15,
        ).length;

        const mediumRiskCount = openRisks.filter(
          (risk) =>
            (risk.probability ?? 0) * (risk.consequence ?? 0) > 4 &&
            (risk.probability ?? 0) * (risk.consequence ?? 0) <= 15,
        ).length;

        const lowRiskCount = openRisks.filter(
          (risk) => (risk.probability ?? 0) * (risk.consequence ?? 0) < 5,
        ).length;

        if (highRiskCount >= mediumRiskCount && highRiskCount >= lowRiskCount) {
          circleColor = 'bg-red-400';
        } else if (mediumRiskCount >= lowRiskCount) {
          circleColor = 'bg-yellow-400';
        } else {
          circleColor = 'bg-green-400';
        }
      }

      return (
        <HoverCard>
          <HoverCardTrigger className="flex h-8 items-center gap-2 rounded hover:cursor-default hover:bg-white dark:hover:bg-zinc-950">
            <div className={cn('h-3 w-3 rounded-full', circleColor)} />
            <div className="it flex justify-center"> {openRisks.length}</div>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="flex flex-col gap-2">
            <p className="gap-1 text-red-400">
              Antal åbne risici:{' '}
              {
                openRisks.filter(
                  (risk) =>
                    (risk.probability ?? 0) * (risk.consequence ?? 0) > 15,
                ).length
              }
            </p>
            <p className="gap-1 text-yellow-400">
              Antal åbne risici:{' '}
              {
                openRisks.filter(
                  (risk) =>
                    (risk.probability ?? 0) * (risk.consequence ?? 0) > 4 &&
                    (risk.probability ?? 0) * (risk.consequence ?? 0) <= 15,
                ).length
              }
            </p>
            <p className="gap-1 text-green-400">
              Antal åbne risici:{' '}
              {
                openRisks.filter(
                  (risk) =>
                    (risk.probability ?? 0) * (risk.consequence ?? 0) < 5,
                ).length
              }
            </p>
          </HoverCardContent>
        </HoverCard>
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const project = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();

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
              onClick={() => toast.error('Not implemented yet')}
            >
              Rediger Projekt
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 hover:bg-red-500 hover:text-white dark:hover:bg-red-400"
              onClick={() => handleArchive(project)}
            >
              Arkiver Projekt
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
