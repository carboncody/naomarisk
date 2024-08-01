// import { Button } from '@components/ui/button';
// import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
// import clsx from 'clsx';
// import { da } from 'date-fns/locale';
// import dayjs from 'dayjs';
// import { useState } from 'react';
// import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';
// import { FaCalendar } from 'react-icons/fa';
// import './styles.css';

// interface DatepickerProps {
//   date: Date | null;
//   startIcon?: JSX.Element;
//   customPlaceholder?: string;
//   customTriggerButton?: JSX.Element;
//   setDate: (date: Date | null) => void;
// }

// export function DatePicker({
//   date,
//   setDate,
//   customTriggerButton,
// }: DatepickerProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <Popover
//         isOpen={isOpen}
//         onOpenChange={setIsOpen}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <PopoverTrigger>
//           {customTriggerButton ?? (
//             <Button
//               onClick={() => setIsOpen(true)}
//               className={clsx(
//                 'border-1 border-Zinc-400 h-full w-full hover:border-white hover:bg-white/0',
//                 'min-h-unit-12  bg-[#27272a] ',
//                 date ? 'text-white' : 'text-white',
//               )}
//             >
//               {date ? (
//                 dayjs(date).format('DD-MM-YYYY')
//               ) : (
//                 <>
//                   <FaCalendar className="text-Zinc-300" /> Vælg Dato
//                 </>
//               )}
//             </Button>
//           )}
//         </PopoverTrigger>

//         <PopoverContent className="p-0">
//           <DayPicker
//             showWeekNumber
//             showOutsideDays
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//             locale={da}
//             className={clsx(
//               'm-0 rounded-lg p-2',
//               'bg-[#413e3e]',
//               'text-Zinc-200 text-xs md:text-sm',
//               'backdrop-blur-sm duration-300',
//               'border-1 border-black',
//             )}
//             classNames={{
//               button:
//                 'hover:bg-Zinc-300 focus:bg-Zinc-300 hover:bg-Zinc-300/70 hover:text-text-white w-[300px] h-[28px] md:w-[300px] md:h-[300px] duration-200 hover:cursor-pointer',
//               day_today: 'border-Zinc-200',
//               day_selected: 'bg-white text-black',
//               day_outside: 'text-Zinc-700',
//               caption_start: 'text-sm md:text-md',
//               caption_label: 'text-md font-bold md:text-lg',
//               cell: 'max-h-9 max-w-9 min-h-3 min-w-3',
//               weeknumber: 'size-8 text-Zinc-500 mr-1',
//             }}
//             selected={date ? new Date(date) : undefined}
//             onSelect={(day) => {
//               if (!day) {
//                 setDate(null);
//                 return;
//               }

//               // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//               setDate(dayjs(date).isSame(day, 'day') ? null : day ?? null);
//               setIsOpen(false);
//             }}
//             defaultMonth={date ? new Date(date) : new Date()}
//             mode="single"
//           />
//         </PopoverContent>
//       </Popover>
//     </>
//   );
// }
