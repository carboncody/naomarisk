'use client';

import CreateRisk from '@components/risk/CreateRisk';
import { RiskTable } from '@components/risk/RiskTable';
import { User } from '@lib/api/hooks';
import { Button, Spinner } from '@nextui-org/react';
import Error from 'next/error';
import { useState } from 'react';

export function AllRisk() {
  const [isNewOpen, setIsNewOpen] = useState(false);

  const { data: allEmployees, isFetching, isError, error, refetch } = User();

  if (isFetching) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    <Error statusCode={500} message={error.message} />;
  }

  return (
    <>
      <div className="justify-top flex min-h-screen flex-col items-center px-8 text-white">
        <div className="mb-4 flex w-full justify-between">
          <p className="text-3xl font-semibold">Projekt Risici</p>
          <Button className="w-32" onClick={() => setIsNewOpen(true)}>
            Tilføj
          </Button>
        </div>
        <RiskTable employee={allEmployees ?? []} />
        {/* <div className=" justify-flex flex justify-center">
          <Backbutton href={'/'} />
        </div> */}
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
