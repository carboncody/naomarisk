// 'use client';

// import { Button } from '@nextui-org/react';
// import { Risk } from '@prisma/client';
// import { useState } from 'react';
// import { RiskTable } from './RiskTable';

// interface RiskProps {
//   risks: Risk[];
// }

// export function AllRisk({ risks }: RiskProps) {
//   const [isNewOpen, setIsNewOpen] = useState(false);

//   return (
//     <>
//       <div className="justify-top flex min-h-screen flex-col items-center text-white">
//         <div className="mb-4 flex w-full justify-between">
//           <p className="text-3xl font-semibold">Projekt Risici</p>
//           <Button className="w-32" onClick={() => setIsNewOpen(true)}>
//             Tilføj
//           </Button>
//         </div>
//         {/* <RiskTable employee={allEmployees ?? []} /> */}
//       </div>
//       {/* {isNewOpen && (
//         <CreateRisk
//           isOpen={isNewOpen}
//           setIsOpen={setIsNewOpen}
//           refetch={refetch}
//         />
//       )} */}
//     </>
//   );
// }
