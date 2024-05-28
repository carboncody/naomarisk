'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { useRisks } from '@lib/api/hooks/risks';
import type { Project } from '@models';
import { Button } from '@nextui-org/react';
import Error from 'next/error';
import { useState } from 'react';
import CreateRisk from './CreateRisk';
import RiskTable from './RiskTable';

interface RisksProps {
  project: Project;
}

export function Risks({ project }: RisksProps) {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [NewOpen, setNewOpen] = useState(false);

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
      <div className="justify-top flex min-h-screen w-[1300px] flex-col items-center px-8 text-white">
        <div className="my-4 flex w-full justify-between">
          <p className="text-3xl font-semibold">{project.name}s risici</p>
          <div className="flex gap-4">
            <Button className="w-32" onClick={() => setIsNewOpen(true)}>
              Tilføj
            </Button>
            <Button className="w-32" onClick={() => setNewOpen(true)}>
              Rediger
            </Button>
          </div>
        </div>
        <RiskTable
          risk={allRisks ?? []}
          isOpen={NewOpen}
          setIsOpen={setNewOpen}
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
