'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { useRisks } from '@lib/api/hooks/risks';
import { Button } from '@nextui-org/react';
import Error from 'next/error';
import { useState } from 'react';
import { RiskTable } from './RiskTable';
import CreateRisk from './CreateRisk';

export function AllRisks() {
  const [isNewOpen, setIsNewOpen] = useState(false);

  const {
    data: allRisks,
    isFetching,
    isError,
    error,
    refetch,
  } = useRisks();

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
      <div className="justify-top flex min-h-screen flex-col items-center px-8 text-white">
        <div className="mb-4 mt-40 flex w-full justify-between">
          <p className="text-3xl font-semibold">Alle Medarbejdere</p>
          <Button className="w-32" onClick={() => setIsNewOpen(true)}>
            Tilføj
          </Button>
        </div>
        <RiskTable risk={allRisks ?? []} />
      </div>
      {isNewOpen && (
        <CreateRisk
          isOpen={isNewOpen}
          setIsOpen={setIsNewOpen}
          refetch={refetch}
        />
      )}
    </>
  );
}
