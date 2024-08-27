'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import type { Phase, Risk } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

interface ColumnParams {
  projectId: string;
  risks: Risk[];
  handleEdit: (phase: Phase) => void;
  handleDelete: (phase: Phase) => void;
}

export const phaseTableColumns = ({
  risks,
  handleEdit,
  handleDelete,
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
        <div className="flex flex-col gap-1">
          <span>{phase.name}</span>
          <span className="text-gray-500 dark:text-gray-400">
            {phase.description}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'phase',
    header: 'Risici',
    cell: ({ row: { original: phase } }) => {
      const projectRisks = risks.filter((risk) =>
        phase.projectRisks.flatMap((pr) => pr.id).includes(risk.id),
      );
      const mitigationRisks = risks.filter((risk) =>
        phase.mitigationRisks.flatMap((pr) => pr.id).includes(risk.id),
      );

      return (
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-400">
              Projekt fase
            </span>
            <span>{projectRisks.length}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-400">
              Mitigerende risici
            </span>
            <span>{mitigationRisks.length}</span>
          </p>
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
          Varighed
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
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const risk = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const router = useRouter();

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
            // onClick={() =>
            //   router.push(`/projects/${projectId}/risk/${risk.id}`)
            // }
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
