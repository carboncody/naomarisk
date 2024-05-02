import { type TableColumns } from '../types/table.columns';

export function totalColumnSpacing<T extends Record<string, unknown>>(
  columns: TableColumns<T>,
) {
  return Object.values(columns)
    .map(columnSpacing)
    .reduce((a, b) => a + b, 0);
}

export function columnSpacing<
  T extends Record<string, unknown>,
  K extends keyof T,
>(column: TableColumns<T>[K]) {
  return prepareSpacing(column?.spacing);
}

export function prepareSpacing(spacing?: number) {
  return spacing ?? 1;
}
