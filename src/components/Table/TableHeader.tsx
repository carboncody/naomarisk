import clsx from 'clsx';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { BiSort } from 'react-icons/bi';
import { type SortReducerState } from './sorting/sort.reducer';
import { type TableColumns } from './types/table.columns';
import { prepareSpacing, totalColumnSpacing } from './util/spacing';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TableHeaderProps<T extends Record<string, any>> {
  selectable?: boolean;
  columns: TableColumns<T>;
  sortState: SortReducerState<keyof T>;
  dispatchSortState: React.Dispatch<keyof T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TableHeader<T extends Record<string, any>>({
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
      className={`grid ${colCount} rounded-xl bg-gray-200 pl-4 text-sm text-black  `}
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
                    'flex cursor-pointer items-center duration-300 hover:bg-gray-300 hover:shadow-xl hover:ease-in':
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
