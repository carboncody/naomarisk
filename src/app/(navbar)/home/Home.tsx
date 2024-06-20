'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { useCompany } from '@lib/api/hooks';
import Error from 'next/error';
import { useMemo } from 'react';
import { ProjectBarChart } from './components/ProjectBarChart';
import { RisksPiechart } from './components/RisksPiechart';

export function Home() {
  const { data, isLoading, error } = useCompany();

  const allRisksInCompany = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.projects.flatMap((project) => project.risks);
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (error ?? !data) {
    return <Error statusCode={500} message={'Noget gik galt!'} />;
  }

  return (
    <div className="flex h-full flex-col items-center text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <p className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Naoma{' '}
          <span className="bg-gradient-to-br from-white via-gray-300 to-gray-700 bg-clip-text text-transparent">
            Risk
          </span>
        </p>

        <p>Welcome {data.name}</p>
        <div className="grid min-h-96 w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <RisksPiechart risks={allRisksInCompany} />
          <ProjectBarChart projects={data.projects} />
        </div>
      </div>
    </div>
  );
}
