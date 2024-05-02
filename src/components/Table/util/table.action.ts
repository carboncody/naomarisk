/* eslint-disable @typescript-eslint/no-empty-function */
import { type MenuItemProps } from '@nextui-org/react';

export type TableAction<T extends Record<string, never>> = {
  text: string;
  onClick: (row: T) => void;
} & Omit<MenuItemProps, 'onClick'>;

function defaultTableActions<T extends Record<string, never>>(
  onClickEdit: (row: T) => void,
  onClickDelete: (row: T) => void,
): TableAction<T>[] {
  return [
    {
      text: 'Rediger',
      onClick: onClickEdit,
    },
    {
      text: 'Arkiver',
      color: 'danger',
      className: 'text-danger',
      onClick: onClickDelete,
    },
  ];
}

export function getTableActions<T extends Record<string, never>>(
  rest:
    | { actions: TableAction<T>[] }
    | { onClickEdit: (row: T) => void; onClickDelete: (row: T) => void }
    | Record<string, never>,
) {
  if ('actions' in rest) {
    return rest.actions;
  }

  if ('onClickEdit' in rest && 'onClickDelete' in rest) {
    return defaultTableActions(rest.onClickEdit, rest.onClickDelete);
  }

  return defaultTableActions(
    () => {},
    () => {},
  );
}
