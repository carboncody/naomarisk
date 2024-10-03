'use client';

import { LoadingSpinner } from '@components/ui/LoadSpinner';
import { Card, CardTitle } from '@components/ui/card';
import { useCompany } from '@lib/api/hooks';
import { ProjectStatus, RiskStatus } from '@models';
import Error from 'next/error';
import { useMemo } from 'react';
import { BsBuildingFillGear } from 'react-icons/bs';
import { FaCubes, FaUsers } from 'react-icons/fa';
import { PiShieldWarningBold, PiWarningFill } from 'react-icons/pi';
import { ProjectBarChart } from './components/ProjectBarChart';
import { RiskScorePieChart } from './components/RisksPiechart';

export function Home() {
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

  if (error) {
    return (
      <Error
        statusCode={500}
        title={error?.message ?? 'Noget gik galt! Prøv igen senere'}
      />
    );
  }

  if (!data) {
    return <Error statusCode={404} title="Ingen firma fundet, kontakt admin" />;
  }

  return (
    <div className="mx-auto flex h-full max-w-screen-2xl flex-col dark:text-white">
      <div className="mt-5 flex items-center justify-between md:mt-10">
        <span className="flex select-none gap-2 text-5xl font-medium dark:text-white">
          Velkommen til{' '}
          <p className="bg-gradient-to-br from-black via-amber-400 to-amber-600 bg-clip-text font-medium text-transparent dark:from-white dark:via-amber-50 dark:to-amber-200">
            nRisk
          </p>
        </span>
        <BsBuildingFillGear className="inline h-10 w-10 text-amber-500 dark:text-amber-200" />
      </div>
      <div className="mb-4 mt-5 flex items-center gap-2 border-b border-amber-500 p-2 text-lg dark:text-white md:mt-10">
        <PiShieldWarningBold className="inline h-6 w-6 text-amber-500" />
        <p className="select-none">
          <span>Aktive projekt statisktikker for</span>
          <span className="ml-2 font-bold">{data.name}</span>
        </p>
      </div>
      <div className="mb-5 flex items-center gap-4 md:mb-10">
        <Card className="p-4 shadow-xl">
          <CardTitle className="flex items-center gap-3">
            <FaCubes className="text-3xl" />
            <p className="ml-2 text-3xl">
              {
                data.projects.filter((p) => p.status !== ProjectStatus.CLOSED)
                  .length
              }
            </p>
            <p className="text-lg">Aktive projekter</p>
          </CardTitle>
        </Card>
        <Card className="bg-[#2a9d90]  p-4 shadow-xl dark:bg-[#2eb88a]">
          <CardTitle className="flex items-center gap-3">
            <FaUsers className="text-3xl" />
            <p className="ml-2 text-3xl">{data.users.length}</p>
            <p className="text-lg">Medarbejdere</p>
          </CardTitle>
        </Card>

        <Card className="bg-[#e76e50] p-4 shadow-xl dark:bg-[#2662d9]">
          <CardTitle className="flex items-center gap-3">
            <PiWarningFill className="text-3xl" />
            <p className=" text-3xl">
              {
                allRisksInCompany.filter((r) => r.status !== RiskStatus.Closed)
                  .length
              }
            </p>
            <p className="text-lg">Åben risici</p>
          </CardTitle>
        </Card>
      </div>

      <div className="items-cemter grid h-[50vh] w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <ProjectBarChart projects={data.projects} />
        <RiskScorePieChart risks={allRisksInCompany} />
      </div>
    </div>
  );
}
