import { cloneDeep } from 'lodash';
import { type TableColumns } from '../types/table.columns';
import { type SortReducerState } from './sort.reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortTable<T extends Record<string, any>>(
  { key, direction }: SortReducerState<keyof T>,
  columns: TableColumns<T>,
  rows: T[],
) {
  if (key === null || direction === 'none') {
    return rows;
  }

  const sort = columns[key]?.sort;

  if (sort === undefined) {
    console.error('Could not find sort for column.', { columns, key });
    return rows;
  }

  const sortedRows = cloneDeep(rows).sort((rowA, rowB) =>
    sort(rowA[key], rowB[key]),
  );

  if (direction === 'ascending') {
    return sortedRows;
  }

  return sortedRows.reverse();
}
