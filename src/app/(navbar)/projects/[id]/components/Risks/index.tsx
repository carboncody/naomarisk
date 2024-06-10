'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { useRisks } from '@lib/api/hooks/risks';
import { RiskStatus, type Project } from '@models';
import { Button, Tab, Tabs } from '@nextui-org/react';
import Error from 'next/error';
import { useState } from 'react';
import CreateRisk from './CreateRisk';
import { RiskTable } from './Table';

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
  } = useRisks(project.id);

  if (isFetching) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    <Error statusCode={500} message={error.message} />;
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
            aria-label="Options"
            selectedKey={selectedTab}
            onSelectionChange={(value) => setSelectedTab(value as RiskStatus)}
          >
            <Tab key="OPEN" title="Åben" />
            <Tab className="border-0" key="CLOSED" title="Lukket" />
          </Tabs>
          <Button className="w-32" onClick={() => setIsNewOpen(true)}>
            Tilføj
          </Button>
        </div>
        <RiskTable
          risks={allRisks?.filter((risk) => risk.status === selectedTab) ?? []}
          refetch={refetch}
          project={project}
        />
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
