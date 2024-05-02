// import clsx from "clsx";
// import dayjs from "dayjs";
// import { TableHeader } from "../TableHeader";
// import { useTableSorting } from "../sorting/sort.reducer";
// import { TableColumns } from "../types/table.columns";
// import { DateWiseTableRows } from "./DateWiseTableRows";

// export type TableProps<
//   T extends Record<string, any> & { start_time: Date; end_time: Date | null },
// > = {
//   selectable?: boolean;
//   className?: string;
//   rows: T[];
//   columns: TableColumns<T>;
//   selectedRowIds?: string[];
//   getRowId?: (row: T) => string;
//   onRowClick?: (row: T) => void;
//   setSelectedRowIds?: (selectedRowIds: string[]) => void;
// };

// export function DateWiseTable<
//   T extends Record<string, any> & { start_time: Date; end_time: Date | null },
// >({
//   selectable = false,
//   rows,
//   columns,
//   className,
//   getRowId,
//   onRowClick,
//   selectedRowIds = [],
//   setSelectedRowIds = () => {},
// }: TableProps<T>) {
//   const [sortState, dispatchSortState] = useTableSorting<T>();

//   const descendingRows = [...rows].sort(
//     (a, b) => dayjs(b.start_time).unix() - dayjs(a.start_time).unix()
//   );

//   return (
//     <div
//       className={clsx(
//         "min-w-[90px] rounded-xl border border-gray-200 shadow-lg dark:border-gray-500",
//         className
//       )}
//     >
//       <div className="mb-2 rounded-xl p-4">
//         <TableHeader
//           selectable={selectable}
//           columns={columns as TableColumns<T>}
//           dispatchSortState={dispatchSortState}
//           sortState={sortState}
//         />
//         <DateWiseTableRows
//           selectable={selectable}
//           columns={columns}
//           rows={descendingRows}
//           getRowId={getRowId}
//           selectedRowIds={selectedRowIds}
//           setSelectedRowIds={setSelectedRowIds}
//           onRowClick={onRowClick}
//         />
//       </div>
//     </div>
//   );
// }
