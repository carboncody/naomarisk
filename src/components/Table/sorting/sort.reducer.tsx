'use client';

import { useReducer } from 'react';

export type SortDirection = 'ascending' | 'descending' | 'none';
export interface SortReducerState<T = string> {
  key: T | null;
  direction: SortDirection;
}

export function tableSorterReducer<T = string>(
  state: SortReducerState<T>,
  key: T,
): SortReducerState<T> {
  if (state.key !== key) {
    return { key, direction: 'ascending' };
  }

  if (state.direction === 'ascending') {
    return { key, direction: 'descending' };
  }

  if (state.direction === 'descending') {
    return { key: null, direction: 'none' };
  }

  return { key, direction: 'ascending' };
}

export function useTableSorting<T extends Record<string, unknown>>() {
  return useReducer(tableSorterReducer<keyof T>, {
    key: null,
    direction: 'none',
  });
}
