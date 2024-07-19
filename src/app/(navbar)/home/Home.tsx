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
    <div className="mx-auto flex h-full max-w-screen-2xl flex-col text-white">
      <div className="mt-5 flex items-center justify-between md:mt-10">
        <span className="select-none text-5xl font-medium text-white">
          Welcome {me.fullName},
        </span>
        <BsBuildingFillGear className="inline h-10 w-10 text-amber-200" />
      </div>
      <div className="mb-4 mt-5 flex items-center gap-2 border-b border-amber-500 p-2 text-xl text-white md:mt-10">
        <PiShieldWarningBold className="inline h-6 w-6 text-amber-500" />
        <p className="select-none">
          <span>Aktive projekt statisktikker for</span>
          <span className="ml-2 font-bold">{data.name}</span>
        </p>
      </div>
      <div className="mb-5 flex items-center gap-4 md:mb-10">
        <div className="flex items-end justify-center gap-2 rounded-lg bg-gradient-to-br from-amber-500 via-amber-800 to-amber-900 p-4 font-medium text-white shadow-lg shadow-black">
          <FaCubes className="text-3xl" />
          <p className="ml-2 text-3xl">
            {
              data.projects.filter((p) => p.status !== ProjectStatus.Closed)
                .length
            }
          </p>
          <p className="text-xl">aktive projekter</p>
        </div>
        <div className="flex items-end justify-center gap-2 rounded-lg bg-gradient-to-br from-green-600 via-green-800 to-green-900 p-4 font-medium text-white shadow-lg shadow-black">
          <FaUsers className="text-3xl" />
          <p className="ml-2 text-3xl">{data.users.length}</p>
          <p className="text-xl">medarbejdere</p>
        </div>
        <div className="from-Zinc-600 via-Zinc-800 to-Zinc-900 flex items-end justify-center gap-2 rounded-lg bg-gradient-to-br p-4 font-medium text-white shadow-lg shadow-black">
          <PiWarningFill className="text-3xl" />
          <p className="ml-2 text-3xl">
            {
              allRisksInCompany.filter((r) => r.status !== RiskStatus.Closed)
                .length
            }
          </p>
          <p className="text-xl">åben risici</p>
        </div>
      </div>
      <div className="items-cemter grid h-[50vh] w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <RisksPiechart risks={allRisksInCompany} />
        <ProjectBarChart projects={data.projects} />
        <p className="w-full -translate-y-4 text-center text-sm text-white">
          Riskoer fordelt ved status
        </p>
        <p className="w-full -translate-y-4 text-center text-sm text-white">
          Projekter fordelt ved antal risici og deltager
        </p>
      </div>
    </div>
  );
}
