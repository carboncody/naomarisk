'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { Button } from '@components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useProjectRisks } from '@lib/api/hooks/risks';
import { RiskStatus, type Project } from '@models';
import Error from 'next/error';
import { useState } from 'react';
import CreateRisk from './CreateRisk';
import RiskTable from './RiskTable';

interface RisksProps {
  project: Project;
}

export function Risks({ project }: RisksProps) {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<RiskStatus>(RiskStatus.Open);

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

  return (
    <>
      <div className="justify-top flex w-full flex-col items-center text-white ">
        <p className="text-xl font-semibold">
          Alle {selectedTab === RiskStatus.Open ? 'åben' : 'lukket'} risici for
          projekt {project.name}
        </p>

        <div className="mb-4 flex w-full items-center justify-between">
          <Tabs
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value as RiskStatus)}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value={RiskStatus.Open}>Åben</TabsTrigger>
              <TabsTrigger value={RiskStatus.Closed}>Lukket</TabsTrigger>
            </TabsList>
            <TabsContent value={RiskStatus.Open}>
              <div className="w-full overflow-y-auto rounded-md bg-[#333333] p-4">
                <RiskTable
                  risks={
                    allRisks?.filter(
                      (risk) => risk.status === RiskStatus.Open,
                    ) ?? []
                  }
                  refetch={refetch}
                  project={project}
                />
              </div>
            </TabsContent>
            <TabsContent value={RiskStatus.Closed}>
              <div className="w-full overflow-y-auto rounded-md bg-[#333333] p-4">
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
          <Button className="w-32" onClick={() => setIsNewOpen(true)}>
            Tilføj
          </Button>
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
