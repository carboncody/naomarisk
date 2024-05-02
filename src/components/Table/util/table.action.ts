import { type MenuItemProps } from '@nextui-org/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableAction<T extends Record<string, any>> = {
  text: string;
  onClick: (row: T) => void;
} & Omit<MenuItemProps, 'onClick'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defaultTableActions<T extends Record<string, any>>(
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTableActions<T extends Record<string, any>>(
  rest:
    | { actions: TableAction<T>[] }
    | { onClickEdit: (row: T) => void; onClickDelete: (row: T) => void }
    // eslint-disable-next-line @typescript-eslint/ban-types
    | {},
) {
  if ('actions' in rest) {
    return rest.actions;
  }

  if ('onClickEdit' in rest && 'onClickDelete' in rest) {
    return defaultTableActions(rest.onClickEdit, rest.onClickDelete);
  }

  return defaultTableActions(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
  );
}
