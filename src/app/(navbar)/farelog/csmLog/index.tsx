'use client';

import { DataTable } from "@components/ui/data-table";

export function Csmlog() {
  // if (isLoading) {
  //   return (
  //     <div className="flex h-[80vh] items-center justify-center">
  //       <LoadingSpinner size={50} />
  //     </div>
  //   );
  // }

  // if (error ?? !me) {
  //   return <Error statusCode={500} title={'Noget gik galt!'} />;
  // }

  return (
    <div className="flex h-[300px] w-full flex-col rounded-md dark:bg-zinc-900  ">
      <DataTable columns={[]} data={[]} />
    </div>
  );
}
