'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { useCompany } from '@lib/api/hooks';
import { useMe } from '@lib/providers/me';
import { ProjectStatus, RiskStatus } from '@models';
import Error from 'next/error';
import { useMemo } from 'react';
import { BsBuildingFillGear } from 'react-icons/bs';
import { FaCubes, FaUsers } from 'react-icons/fa';
import { PiShieldWarningBold, PiWarningFill } from 'react-icons/pi';
import { ProjectBarChart } from './components/ProjectBarChart';
import { RisksPiechart } from './components/RisksPiechart';

export function Home() {
  const me = useMe();
  const { data, isLoading, error } = useCompany();

  const allRisksInCompany = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.projects.flatMap((project) => project.risks);
  }, [data]);

  if (isLoading) {
    return (
      <div className="h-[80vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error ?? !data) {
    return <Error statusCode={500} message={'Noget gik galt!'} />;
  }

  return (
    <div className="mx-auto flex h-full max-w-screen-2xl flex-col dark:text-white">
      <div className="mt-5 flex items-center justify-between md:mt-10">
        <span className="select-none text-5xl font-medium dark:text-white">
          Welcome {me.fullName},
        </span>
        <BsBuildingFillGear className="inline h-10 w-10 text-amber-500 dark:text-amber-200" />
      </div>
      <div className="mb-4 mt-5 flex items-center gap-2 border-b border-amber-500 p-2 text-xl dark:text-white md:mt-10">
        <PiShieldWarningBold className="inline h-6 w-6 text-amber-500" />
        <p className="select-none">
          <span>Aktive projekt statisktikker for</span>
          <span className="ml-2 font-bold">{data.name}</span>
        </p>
      </div>
      <div className="mb-5 flex items-center gap-4 md:mb-10">
  <div className="flex items-end justify-center gap-2 rounded-lg bg-gradient-to-br from-amber-200 dark:from-yellow-400 via-amber-500 dark:via-yellow-600 to-amber-600 dark:to-yellow-800 p-4 font-medium text-white shadow-lg shadow-zinc-600">
    <FaCubes className="text-3xl" />
    <p className="ml-2 text-3xl">
      {data.projects.filter((p) => p.status !== ProjectStatus.Closed).length}
    </p>
    <p className="text-xl">Aktive projekter</p>
  </div>
  <div className="flex items-end justify-center gap-2 rounded-lg bg-gradient-to-br from-green-300 dark:from-teal-500 dark:via-teal-600 via-green-500 dark:to-teal-700 to-green-600 p-4 font-medium text-white shadow-lg shadow-zinc-600">
    <FaUsers className="text-3xl" />
    <p className="ml-2 text-3xl">{data.users.length}</p>
    <p className="text-xl">Medarbejdere</p>
  </div>
  <div className="flex items-end justify-center gap-2 rounded-lg bg-gradient-to-br from-zinc-300 dark:from-gray-500 via-zinc-500 dark:via-gray-600 to-zinc-600 dark:to-gray-700 p-4 font-medium text-white shadow-lg shadow-zinc-600">
    <PiWarningFill className="text-3xl" />
    <p className="ml-2 text-3xl">
      {allRisksInCompany.filter((r) => r.status !== RiskStatus.Closed).length}
    </p>
    <p className="text-xl">Åben risici</p>
  </div>
</div>

      <div className="items-cemter grid h-[50vh] w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <RisksPiechart risks={allRisksInCompany} />
        <ProjectBarChart projects={data.projects} />
      </div>
    </div>
  );
}
