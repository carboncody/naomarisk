'use client';

import * as React from 'react';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  tableId?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  tableId,
}: DataTableProps<TData, TValue>) {
  const localSorting = localStorage.getItem(`${tableId}-sorting`);
  const [sorting, setSorting] = React.useState<SortingState>(
    localSorting !== null && localSorting !== 'undefined'
      ? (JSON.parse(localSorting) as SortingState)
      : [],
  );

  function saveSorting(sorting: React.SetStateAction<SortingState>) {
    console.info('sorting: ', sorting);
    console.info('tableId: ', tableId);

    if (!tableId) {
      return;
    }

    setSorting(sorting);
    // TODO : extract new state from state setter
    localStorage.setItem(`${tableId}-sorting`, JSON.stringify(sorting));
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: saveSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => onRowClick?.(row.original)}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
