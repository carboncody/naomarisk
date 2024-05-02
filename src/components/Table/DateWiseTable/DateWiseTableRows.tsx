// import { getDecimalDuration } from "@components/TimeRegistration/Utils/getDecimalDuration";
// import { Checkbox } from "@nextui-org/react";
// import clsx from "clsx";
// import dayjs from "dayjs";
// import "dayjs/locale/da";
// import { BsClockHistory } from "react-icons/bs";
// import { CiCalendar } from "react-icons/ci";
// import { TableColumns } from "../types/table.columns";
// import { prepareSpacing, totalColumnSpacing } from "../util/spacing";
// dayjs.locale("da");

// interface GroupedRow<T> {
//   rows: T[];
//   totalDuration: number;
// }

// interface GroupedRows<T> {
//   [formattedDate: string]: GroupedRow<T>;
// }

// interface DateWiseTableRowsProps<
//   T extends Record<string, any> & { start_time: Date; end_time: Date | null },
// > {
//   selectable: boolean;
//   rows: T[];
//   columns: TableColumns<T>;
//   selectedRowIds: string[];
//   setSelectedRowIds: (selectedRowIds: string[]) => void;
//   getRowId?: (row: T) => string;
//   onRowClick?: (row: T) => void;
// }

// export function DateWiseTableRows<
//   T extends Record<string, any> & { start_time: Date; end_time: Date | null },
// >({
//   selectable,
//   rows,
//   columns,
//   selectedRowIds,
//   setSelectedRowIds,
//   getRowId = JSON.stringify,
//   onRowClick,
// }: DateWiseTableRowsProps<T>) {
//   const colCount =
//     "grid-cols-" +
//     (selectable
//       ? totalColumnSpacing(columns) + 1
//       : totalColumnSpacing(columns));

//   const groupedRows = rows.reduce<GroupedRows<T>>((acc, row) => {
//     const rowDate = dayjs(row.start_time);
//     const currentDate = dayjs();
//     const formattedDate = rowDate.isSame(currentDate, "day")
//       ? "Idag"
//       : rowDate.isSame(currentDate.subtract(1, "day"), "day")
//       ? "Igår"
//       : rowDate.format("DD. MMM YYYY");

//     if (!acc[formattedDate]) {
//       acc[formattedDate] = {
//         rows: [],
//         totalDuration: 0,
//       };
//     }

//     acc[formattedDate].rows.push(row);

//     acc[formattedDate].totalDuration += getDecimalDuration(
//       rowDate,
//       row.end_time ? dayjs(row.end_time) : null
//     );

//     return acc;
//   }, {});

//   const handleCheckboxChange = (rowId: string, isSelected: boolean) => {
//     setSelectedRowIds(
//       isSelected
//         ? [...selectedRowIds, rowId]
//         : selectedRowIds.filter((id) => id !== rowId)
//     );
//   };

//   const handleSelectAllChange = (isSelected: boolean) => {
//     setSelectedRowIds(isSelected ? rows.map(getRowId) : []);
//   };

//   return (
//     <div>
//       {Object.entries(groupedRows).length === 0 ? (
//         <div className="px-4 pt-6 text-center text-gray-400">
//           Ingen rekorder fundet
//         </div>
//       ) : (
//         <div>
//           <div className="flex items-center justify-between px-2 py-4">
//             {selectable ? (
//               <div className="flex items-center text-lg">
//                 <Checkbox
//                   radius="sm"
//                   isSelected={selectedRowIds.length === rows.length}
//                   onValueChange={handleSelectAllChange}
//                 />
//                 <span>Vælg alle</span>
//               </div>
//             ) : (
//               <div className="flex-1"></div>
//             )}
//             <div className="flex items-center rounded-lg bg-gray-100 px-2 text-end text-lg dark:bg-dark-gray-primary">
//               <span>
//                 i alt{" "}
//                 {rows
//                   .reduce((total, row) => {
//                     return (
//                       total +
//                       getDecimalDuration(
//                         dayjs(row.start_time),
//                         row.end_time ? dayjs(row.end_time) : null
//                       )
//                     );
//                   }, 0)
//                   .toFixed(2)}{" "}
//                 t.
//               </span>
//               <BsClockHistory className="ml-2 text-lg" />
//             </div>
//           </div>
//           {Object.entries(groupedRows).map(
//             ([formattedDate, { rows: groupRows, totalDuration }]) => (
//               <div
//                 key={formattedDate}
//                 className="mb-2 rounded-2xl border border-gray-200 pt-2 dark:border-gray-500"
//               >
//                 <div className="m-2 inline-flex items-center rounded-lg bg-gray-100 px-2 dark:bg-dark-gray-primary">
//                   <CiCalendar className="mr-2 text-lg" />
//                   <span>{formattedDate}</span>
//                   <span className="mx-1">-</span>
//                   <span>{totalDuration.toFixed(2)} timer</span>
//                 </div>
//                 {groupRows.map((row, rowIndex) => (
//                   <div
//                     key={getRowId(row)}
//                     className={clsx(
//                       colCount,
//                       "flex w-full border-gray-200 py-4 pl-4 duration-300 hover:cursor-pointer hover:rounded-2xl hover:bg-gray-50 dark:border-gray-500 dark:hover:bg-dark-gray-primary",
//                       {
//                         "border-b": rowIndex !== groupRows.length - 1,
//                       }
//                     )}
//                   >
//                     <div
//                       key={getRowId(row)}
//                       className={clsx(colCount, "grid w-full gap-2 text-sm")}
//                     >
//                       {Object.keys(columns)
//                         .map((key, index) => ({
//                           ...columns[key],
//                           key,
//                           index,
//                         }))
//                         .map(({ key, index, spacing, render }) =>
//                           index === 0 ? (
//                             <div
//                               key={key}
//                               className={clsx(
//                                 "col-span-" + prepareSpacing(spacing),
//                                 "flex items-center"
//                               )}
//                               onClick={() => onRowClick?.(row)}
//                             >
//                               {selectable && (
//                                 <Checkbox
//                                   radius="sm"
//                                   isSelected={selectedRowIds.includes(
//                                     getRowId(row)
//                                   )}
//                                   onValueChange={(isSelected) =>
//                                     handleCheckboxChange(
//                                       getRowId(row),
//                                       isSelected
//                                     )
//                                   }
//                                 />
//                               )}
//                               {render ? render(row) : row[key]}
//                             </div>
//                           ) : (
//                             <div
//                               key={key}
//                               className={"col-span-" + prepareSpacing(spacing)}
//                               onClick={() => onRowClick?.(row)}
//                             >
//                               {render ? render(row) : row[key]}
//                             </div>
//                           )
//                         )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
