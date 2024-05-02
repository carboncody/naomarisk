import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { Checkbox } from '@nextui-org/react';
import clsx from 'clsx';
import { useState } from 'react';
import { type TableColumns } from './types/table.columns';
import { prepareSpacing, totalColumnSpacing } from './util/spacing';
import { type TableAction } from './util/table.action';

interface TableRowsProps<T extends Record<string, never>> {
  rows: T[];
  columns: TableColumns<T>;
  actions: TableAction<T>[];
  selectedRowIds?: string[];
  getRowId?: (row: T) => string;
  onRowClick?: (row: T) => void;
  setSelectedRowIds?: (ids: string[]) => void;
}

export function TableRows<T extends Record<string, never>>({
  rows,
  columns,
  actions,
  selectedRowIds,
  onRowClick,
  getRowId = JSON.stringify,
  setSelectedRowIds,
}: TableRowsProps<T>) {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <Dropdown key={getRowId(row)} onOpenChange={setIsMenuOpen}>
              <DropdownTrigger className="dark:active:bg-dark-gray-primary active:bg-gray-100">
                <div
                  className={clsx(
                    'flex items-center transition-all duration-100 hover:cursor-pointer hover:ease-in',
                    {
                      'border-b border-gray-200 dark:border-gray-500':
                        rowIndex !== rows.length - 1,
                      'dark:bg-dark-gray-primary rounded-lg bg-gray-100':
                        selectedRowId === getRowId(row) &&
                        !selectedRowIds &&
                        !setSelectedRowIds,
                    },
                  )}
                  onClick={() => {
                    setSelectedRowId(getRowId(row));
                    isMenuOpen && onRowClick && onRowClick(row);
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
                      {
                        'hover:dark:bg-dark-gray-primary rounded-lg hover:bg-gray-100':
                          !isMenuOpen,
                      },
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
                              {column.render
                                ? column.render(row)
                                : row[column.key]}
                            </div>
                          ),
                      )}
                  </div>
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                onClose={() => setSelectedRowId(null)}
                emptyContent={'Ingen handlinger'}
              >
                {actions.map(({ text, onClick, ...rest }, i) => (
                  <DropdownItem
                    {...rest}
                    key={text + i}
                    onClick={() => {
                      const row = rows.find(
                        (r) => getRowId(r) === selectedRowId,
                      );

                      row && onClick && onClick(row);
                    }}
                  >
                    {text}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ))}
        </>
      )}
    </div>
  );
}
