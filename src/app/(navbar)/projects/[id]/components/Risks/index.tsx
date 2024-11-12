'use client';

import { LoadingSpinner } from '@components/ui';
import { Button } from '@components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useProjectRisks } from '@lib/api/hooks/risks';
import { RiskStatus, type Project, type Risk } from '@models';
import Error from 'next/error';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { CreateRisk } from './CreateRisk';
import { FilterDropdown } from './FilterDropdown';
import { RiskTable } from './RiskTable';

interface RisksProps {
  project: Project;
}

export function Risks({ project }: RisksProps) {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<RiskStatus | 'all'>('all');
  const score = useSearchParams().get('score');
  const [filters, setFilters] = useState<{ score?: number }>({
    score: score ? Number(score) : undefined,
  });

  const {
    data: allRisks,
    isFetching,
    isRefetching,
    isError,
    error,
    refetch,
  } = useProjectRisks(project.id);

  if (isFetching && !isRefetching) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <LoadingSpinner size={50} />
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
          if (selectedTab === 'all') {
            return true;
          }
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

  const activeTabRisks =
    selectedTab === 'all'
      ? filteredRisks
      : filteredRisks.filter((risk) => {
          return (
            risk.status === selectedTab ||
            (selectedTab === RiskStatus.Open &&
              risk.status === RiskStatus.Open) ||
            (selectedTab === RiskStatus.Closed &&
              risk.status === RiskStatus.Closed)
          );
        });

  return (
    <>
      <div className="justify-top mt-10 flex w-full flex-col items-center">
        <p className="text-xl font-semibold underline">
          Projekt: {project.name}
        </p>

        <div className="mb-4 flex w-full items-center justify-between">
          <Tabs
            value={selectedTab}
            onValueChange={(value) =>
              setSelectedTab(value as RiskStatus | 'all')
            }
            className="w-full"
          >
            <div className="flex w-full items-center justify-between">
              <div>
                <TabsList>
                  <TabsTrigger value={'all'}> Alle </TabsTrigger>
                  <TabsTrigger value={RiskStatus.Open}>Åben</TabsTrigger>
                  <TabsTrigger value={RiskStatus.Closed}>Lukket</TabsTrigger>
                </TabsList>
              </div>
              <div className="flex gap-2 text-sm">
                <FilterDropdown riskOwnerIds={[]}></FilterDropdown>
                <Button variant="default" onClick={() => setIsNewOpen(true)}>
                  Tilføj
                </Button>
              </div>
            </div>
            <TabsContent value={selectedTab}>
              {filters.score && (
                <div className="my-2 flex w-full justify-end">
                  <div className="flex items-center">
                    <div className="rounded-l-lg border border-r-0 border-zinc-400 bg-gray-200 px-2 font-light text-black dark:border-transparent dark:bg-zinc-700 dark:text-white">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        Filtrering for risikoscore
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
              <RiskTable
                risks={activeTabRisks}
                refetch={refetch}
                project={project}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CreateRisk
        isOpen={isNewOpen}
        setIsOpen={setIsNewOpen}
        refetch={refetch}
        project={project}
      />
    </>
  );
}
