import { type TableColumns } from '../types/table.columns';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function totalColumnSpacing<T extends Record<string, any>>(
  columns: TableColumns<T>,
) {
  return Object.values(columns)
    .map(columnSpacing)
    .reduce((a, b) => a + b, 0);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function columnSpacing<T extends Record<string, any>, K extends keyof T>(
  column: TableColumns<T>[K],
) {
  return prepareSpacing(column?.spacing);
}

export function prepareSpacing(spacing?: number) {
  return spacing ?? 1;
}
