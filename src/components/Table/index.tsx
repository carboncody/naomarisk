import clsx from 'clsx';
import { useDeepCompareMemo } from 'use-deep-compare';
import { TableHeader } from './TableHeader';
import { TableRows } from './TableRows';
import { useTableSorting } from './sorting/sort.reducer';
import { sortTable } from './sorting/sort.table';
import { type TableColumns } from './types/table.columns';
import { getTableActions, type TableAction } from './util/table.action';

export type TableProps<T extends Record<string, never>> = {
  applyMinWidth?: boolean;
  rows: T[];
  columns: TableColumns<T>;
  className?: string;
  selectedRowIds?: string[];
  getRowId?: (row: T) => string;
  onRowClick?: (row: T) => void;
  setSelectedRowIds?: (ids: string[]) => void;
} & (
  | { actions: TableAction<T>[] }
  | { onClickEdit: (row: T) => void; onClickDelete: (row: T) => void }
  | NonNullable<unknown>
);

export function Table<T extends Record<string, never>>({
  applyMinWidth = true,
  rows,
  columns,
  className,
  selectedRowIds,
  getRowId,
  onRowClick,
  setSelectedRowIds,
  ...rest
}: TableProps<T>) {
  const [sortState, dispatchSortState] = useTableSorting<T>();

  const actions = useDeepCompareMemo(() => getTableActions(rest), [rest]);
  const orderedRows = useDeepCompareMemo(
    () => sortTable(sortState, columns, rows),
    [sortState, columns, rows],
  );

  return (
    <div
      className={clsx(
        'rounded-xl border shadow-lg',
        applyMinWidth && 'min-w-[900px]',
        className,
      )}
    >
      <div className="mb-2 rounded-xl p-4">
        <TableHeader
          selectable={!!(selectedRowIds && setSelectedRowIds)}
          columns={columns}
          dispatchSortState={dispatchSortState}
          sortState={sortState}
        />
        <TableRows
          columns={columns}
          actions={actions}
          rows={orderedRows}
          selectedRowIds={selectedRowIds}
          getRowId={getRowId}
          onRowClick={onRowClick}
          setSelectedRowIds={setSelectedRowIds}
        />
      </div>
    </div>
  );
}
