import clsx from 'clsx';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { BiSort } from 'react-icons/bi';
import { type SortReducerState } from './sorting/sort.reducer';
import { type TableColumns } from './types/table.columns';
import { prepareSpacing, totalColumnSpacing } from './util/spacing';

interface TableHeaderProps<T extends Record<string, unknown>> {
  selectable?: boolean;
  columns: TableColumns<T>;
  sortState: SortReducerState<keyof T>;
  dispatchSortState: React.Dispatch<keyof T>;
}

export function TableHeader<T extends Record<string, unknown>>({
  selectable = false,
  columns,
  sortState,
  dispatchSortState,
}: TableHeaderProps<T>) {
  function getSortIcon(key: keyof T) {
    if (sortState.key === key && sortState.direction === 'ascending') {
      return <AiOutlineArrowUp className="ml-2" />;
    }
    if (sortState.key === key && sortState.direction === 'descending') {
      return <AiOutlineArrowDown className="ml-2" />;
    }
    return <BiSort className="ml-2" />;
  }

  const colCount =
    'grid-cols-' +
    (selectable
      ? totalColumnSpacing(columns) + 1
      : totalColumnSpacing(columns));

  return (
    <div
      className={`grid ${colCount} dark:bg-dark-gray-primary rounded-xl bg-gray-100 pl-4 text-sm`}
    >
      {Object.keys(columns)
        .map((key) => ({
          ...columns[key],
          key,
          spacing: prepareSpacing(columns[key]?.spacing),
          sortable: columns[key]?.sort !== undefined,
        }))
        .map(
          ({ spacing, key, title, sortable }, index) =>
            spacing >= 0 && (
              <div
                key={index}
                className={clsx(
                  `col-span-${spacing} select-none rounded-lg px-2 py-4`,
                  {
                    'flex cursor-pointer items-center duration-300 hover:shadow-md hover:ease-in':
                      sortable,
                  },
                )}
                onClick={() => sortable && dispatchSortState(key)}
              >
                {title} {sortable && getSortIcon(key)}
              </div>
            ),
        )}
    </div>
  );
}
