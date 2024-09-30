/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@components/ui/hover-card';
import {
  ColorMap,
  RiskMap,
  Thresholds,
  getThreshold,
} from '@lib/calc/threshholds';
import { cn } from '@lib/utils';
import type { Project, Risk } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PhaseProgressBar } from '../phase/PhaseProgressBar';

function getStyleColor(risk: Risk): string | undefined {
  const riskValue =
    risk.probability && risk.consequence
      ? risk.probability * risk.consequence
      : 0;
  const threshold = RiskMap[riskValue];
  return threshold !== undefined ? ColorMap[threshold] : undefined;
}

interface ColumnParams {
  handleEdit: (risk: Risk) => void;
  handleDelete: (risk: Risk) => void;
  project: Project;
}

export const columns = ({
  handleEdit,
  handleDelete,
  project,
}: ColumnParams): ColumnDef<Risk>[] => [
  {
    accessorKey: 'riskScore',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Risikoscore
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const risk = row.original;
      const threshold = getThreshold(risk);
      return (
        <HoverCard>
          <HoverCardTrigger className="flex h-8 items-center gap-2 rounded p-1 hover:cursor-default hover:bg-white dark:hover:bg-zinc-950">
            <div
              className={cn(
                'flex items-center gap-2',
                threshold === Thresholds.RED &&
                  'text-red-500 dark:text-red-300',
                threshold === Thresholds.GREEN &&
                  'text-green-500 dark:text-green-400',
                threshold === Thresholds.YELLOW &&
                  'text-yellow-500 dark:text-yellow-400',
              )}
            >
              <div
                style={{
                  background: getStyleColor(row.original),
                }}
                className={cn(
                  'h-3 w-3 rounded-full bg-zinc-400 dark:bg-zinc-400',
                  getThreshold(row.original) === Thresholds.RED,
                )}
              />
              {risk.probability && risk.consequence ? (
                <em>
                  {' '}
                  {'->'} {risk.probability * risk.consequence}
                </em>
              ) : (
                <em className="text-zinc-400"> {'->'} --</em>
              )}
            </div>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="flex flex-col gap-2">
            <div>Sansynlighed: {risk.probability}</div>
            <div>Konsense: {risk.consequence}</div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },

  {
    accessorKey: 'customId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          RISK-ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="truncate">
        <span>{row.original.customId}</span>
        <br />
        <span>Status: {row.original.status}</span>
      </div>
    ),
  },
  {
    accessorKey: 'riskowner',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Risikoejer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="line-clamp-2">
        {row.original.riskowner ? (
          row.original.riskowner.fullName ?? row.original.riskowner.email
        ) : (
          <em className="text-zinc-400">Ingen ejer</em>
        )}
      </span>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Beskrivelse
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="line-clamp-2">{row.original.description}</span>
    ),
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
          Projekt Fase
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row: { original: risk } }) => {
      return (
        <PhaseProgressBar
          projectPhases={project.phases}
          riskPhaseId={risk.projectPhaseId}
          mitigatingPhaseId={risk.mitigationPhaseId}
        />
      );
    },
  },
  {
    accessorKey: 'activity',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent hover:underline dark:hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Aktivitet
          <br />
          <span className="text-xs">(mitigerende handling)</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="line-clamp-2">{row.original.activity}</span>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const risk = row.original;
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
              onClick={() =>
                router.push(`/projects/${project.id}/risk/${risk.id}`)
              }
            >
              Vis
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(risk)}>
              Rediger
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="group-hover:bg-red-500 group-hover:text-white dark:group-hover:bg-red-400"
              onClick={() => handleDelete(risk)}
            >
              Slet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
