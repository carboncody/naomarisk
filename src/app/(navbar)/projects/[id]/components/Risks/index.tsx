'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { Button } from '@components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useProjectRisks } from '@lib/api/hooks/risks';
import { RiskStatus, type Project, type Risk } from '@models';
import Error from 'next/error';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import CreateRisk from './CreateRisk';
import RiskTable from './RiskTable';

interface RisksProps {
  project: Project;
}

export function Risks({ project }: RisksProps) {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<RiskStatus>(RiskStatus.Open);
  const score = useSearchParams().get('score');
  const [filters, setFilters] = useState<{ score?: number }>({
    score: score ? Number(score) : undefined,
  });

  const {
    data: allRisks,
    isFetching,
    isError,
    error,
    refetch,
  } = useProjectRisks(project.id);

  if (isFetching) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <Error statusCode={500} title={error.message} />;
  }

  const getFilteredRisks = (): Risk[] => {
    const statusMatch = selectedTab;
    const scoreMatch = filters.score;

    return allRisks
      ? allRisks.filter((risk) => {
          if (scoreMatch && risk.probability && risk.consequence) {
            return risk.probability * risk.consequence === scoreMatch;
          } else if (scoreMatch) {
            return false;
          }
          return risk.status === statusMatch;
        })
      : [];
  };

  const filteredRisks = getFilteredRisks();

  return (
    <>
      <div className="justify-top flex w-full flex-col items-center text-white ">
        <p className="text-xl font-semibold text-black dark:text-white">
          Projekt: {project.name}, har{' '}
          {selectedTab === RiskStatus.Open
            ? project.risks.filter((risk) => risk.status === RiskStatus.Open)
                .length
            : selectedTab === RiskStatus.Closed
              ? project.risks.filter(
                  (risk) => risk.status === RiskStatus.Closed,
                ).length
              : project.risks.length}{' '}
          {selectedTab === RiskStatus.Open
            ? 'åbne'
            : selectedTab === RiskStatus.Closed
              ? 'lukkede'
              : ''}{' '}
          risici
        </p>

        {filters.score && (
          <div className="my-4 flex w-full justify-end">
            <div className="flex items-center">
              <div className="rounded-l-lg border border-r-0 border-zinc-400 bg-gray-200 px-2 font-light text-black dark:border-transparent dark:bg-zinc-700 dark:text-white">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Filtering for riskscore
                </span>{' '}
                {filters.score}
              </div>
              <div
                onClick={() => setFilters({})}
                className="border-l-dashed flex h-full items-center justify-center rounded-r-lg border border-dashed border-black bg-gray-200 px-2 font-light text-black duration-200 hover:cursor-pointer hover:text-red-500 dark:border-zinc-500 dark:bg-zinc-700 dark:text-white dark:hover:text-red-400"
              >
                <RxCross2 />
              </div>
            </div>
          </div>
        )}
        <div className="mb-4 flex w-full items-center justify-between">
          <Tabs
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value as RiskStatus)}
            className="w-full"
          >
            <div className="flex w-full items-center justify-between">
              <TabsList>
                <TabsTrigger value={'all'}> Alle </TabsTrigger>
                <TabsTrigger value={RiskStatus.Open}>Åben</TabsTrigger>
                <TabsTrigger value={RiskStatus.Closed}>Lukket</TabsTrigger>
              </TabsList>
              <Button variant="default" onClick={() => setIsNewOpen(true)}>
                Tilføj
              </Button>
            </div>
            <TabsContent value={'all'}>
              <div className="w-full overflow-y-auto rounded-md border p-4 dark:border-transparent dark:bg-zinc-900">
                <RiskTable
                  risks={allRisks ?? []}
                  refetch={refetch}
                  project={project}
                />
              </div>
            </TabsContent>
            <TabsContent value={RiskStatus.Open}>
              <div className="w-full overflow-y-auto rounded-md border p-4 dark:border-transparent dark:bg-zinc-900">
                <RiskTable
                  risks={filteredRisks}
                  refetch={refetch}
                  project={project}
                />
              </div>
            </TabsContent>
            <TabsContent value={RiskStatus.Closed}>
              <div className="w-full overflow-y-auto rounded-md border p-4 dark:border-transparent dark:bg-zinc-900">
                <RiskTable
                  risks={
                    allRisks?.filter(
                      (risk) => risk.status === RiskStatus.Closed,
                    ) ?? []
                  }
                  refetch={refetch}
                  project={project}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {isNewOpen && (
        <CreateRisk
          isOpen={isNewOpen}
          setIsOpen={setIsNewOpen}
          refetch={refetch}
          project={project}
        />
      )}
    </>
  );
}
