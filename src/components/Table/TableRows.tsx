import { Checkbox } from '@nextui-org/react';
import clsx from 'clsx';
import { useState } from 'react';
import { type TableColumns } from './types/table.columns';
import { prepareSpacing, totalColumnSpacing } from './util/spacing';
import { type TableAction } from './util/table.action';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TableRowsProps<T extends Record<string, any>> {
  rows: T[];
  columns: TableColumns<T>;
  actions: TableAction<T>[];
  selectedRowIds?: string[];
  getRowId?: (row: T) => string;
  onRowClick?: (row: T) => void;
  setSelectedRowIds?: (ids: string[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TableRows<T extends Record<string, any>>({
  rows,
  columns,
  selectedRowIds,
  onRowClick,
  getRowId = JSON.stringify,
  setSelectedRowIds,
}: TableRowsProps<T>) {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const colCount =
    'grid-cols-' +
    (selectedRowIds && setSelectedRowIds
      ? totalColumnSpacing(columns) + 1
      : totalColumnSpacing(columns));

  const handleCheckboxChange = (rowId: string, isSelected: boolean) => {
    selectedRowIds !== undefined &&
      setSelectedRowIds !== undefined &&
      setSelectedRowIds(
        isSelected
          ? [...selectedRowIds, rowId]
          : selectedRowIds.filter((id) => id !== rowId),
      );
  };

  const handleSelectAllChange = (isSelected: boolean) => {
    setSelectedRowIds &&
      setSelectedRowIds(isSelected ? rows.map(getRowId) : []);
  };

  return (
    <div>
      {rows.length === 0 ? (
        <div className="px-4 py-4 text-center">Ingen rekorder fundet</div>
      ) : (
        <>
          {selectedRowIds && setSelectedRowIds && (
            <div className="flex items-center py-2 text-lg">
              <Checkbox
                radius="sm"
                isSelected={selectedRowIds.length === rows.length}
                onValueChange={handleSelectAllChange}
              />
              <span>Vælg alle</span>
            </div>
          )}
          {rows.map((row, rowIndex) => (
            <div
              key={getRowId(row)}
              className={clsx(
                'flex items-center transition-all duration-100 hover:cursor-pointer hover:ease-in',
                {
                  'border-b border-gray-200 dark:border-gray-500':
                    rowIndex !== rows.length - 1,
                  'rounded-lg bg-[#494949]':
                    selectedRowId === getRowId(row) &&
                    !selectedRowIds &&
                    !setSelectedRowIds,
                },
              )}
              onClick={() => {
                setSelectedRowId(getRowId(row));
                onRowClick && onRowClick(row);
              }}
            >
              {selectedRowIds && setSelectedRowIds && (
                <div className="flex items-center">
                  <Checkbox
                    radius="sm"
                    isSelected={selectedRowIds.includes(getRowId(row))}
                    onValueChange={(isSelected) =>
                      handleCheckboxChange(getRowId(row), isSelected)
                    }
                  />
                </div>
              )}
              <div
                className={clsx(
                  colCount,
                  'grid w-full gap-2 py-4 pl-4 text-sm',
                )}
              >
                {Object.keys(columns)
                  .map((key) => ({ ...columns[key], key }))
                  .map(
                    (column) =>
                      column.spacing !== 0 && (
                        <div
                          key={`${column.key}_${getRowId(row)}`}
                          className={
                            'col-span-' + prepareSpacing(column.spacing)
                          }
                        >
                          {column.render ? column.render(row) : row[column.key]}
                        </div>
                      ),
                  )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
