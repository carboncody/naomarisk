'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColorMap, RiskMap } from '@lib/calc/threshholds';
import { type Risk } from '@models';
import { type ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  projectId: string;
}

export const columns = ({
  handleEdit,
  projectId,
}: ColumnParams): ColumnDef<Risk>[] => [
  {
    accessorKey: 'customId',
    header: 'Risk-ID',
    cell: ({ row }) => (
      <div className="truncate text-black dark:text-white">
        <span>{row.original.customId}</span>
        <br />
        <span>Status: {row.original.status}</span>
      </div>
    ),
  },
  {
    accessorKey: 'riskowner',
    header: 'Ejer',
    cell: ({ row }) => (
      <div className="truncate text-black dark:text-white">
        <span>
          {row.original.riskowner ? (
            row.original.riskowner.fullName ?? row.original.riskowner.email
          ) : (
            <em className="text-Zinc-400">Ingen ejer</em>
          )}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Beskrivelse',
    cell: ({ row }) => (
      <div className="col-span-2 flex items-center justify-between truncate text-black dark:text-white">
        <span>{row.original.description}</span>
      </div>
    ),
  },
  {
    accessorKey: 'riskScore',
    header: 'Risiko -> Risikoscore',
    cell: ({ row }) => {
      const risk = row.original;
      return (
        <div className="grid grid-cols-2">
          <div
            style={{
              color: getStyleColor(risk),
            }}
            className={clsx('col-span-1 flex items-center gap-2')}
          >
            <div>
              <p>Sansynlighed :</p>
              <p>Konsekvens :</p>
            </div>
            <div>
              <p>
                {risk.probability ?? (
                  <em className="text-Zinc-400">Ikke defineret</em>
                )}
              </p>
              <p>
                {risk.consequence ?? (
                  <em className="text-Zinc-400">Ikke defineret</em>
                )}
              </p>
            </div>
            {risk.probability && risk.consequence && (
              <em>
                {' '}
                {'->'} {risk.probability * risk.consequence}
              </em>
            )}
          </div>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const risk = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/projects/${projectId}/risk/${risk.id}`)
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(risk)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];