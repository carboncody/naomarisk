'use client';

import NewProjectDialog from '@components/create/NewProjectDialog';
import { useProjectsInCompany } from '@lib/api/hooks';
import { Button, Spinner } from '@nextui-org/react';
import Error from 'next/error';
import Link from 'next/link';
import { useState } from 'react';
import { ProjectTable } from './ProjectTable';

export function AllProjects() {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const {
    data: allProjects,
    isFetching,
    isError,
    error,
    refetch,
  } = useProjectsInCompany();

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
      <div className="justify-top flex min-h-screen flex-col items-center bg-gradient-to-b  from-[#1c1c1c] to-[#2a2929] px-8 text-white">
        <div className="mb-4 mt-40 flex w-full justify-between">
          <p className="text-3xl font-semibold">Alle Projekter</p>
          <Button className="w-32" onClick={() => setIsNewOpen(true)}>
            Tilføj
          </Button>
        </div>
        <ProjectTable projects={allProjects ?? []} />
        <div className=" justify-flex flex justify-center">
          <Link className="block w-full p-3" href="/">
            <Button>Tilbage</Button>
          </Link>
        </div>
      </div>
      {isNewOpen && (
        <NewProjectDialog
          isOpen={isNewOpen}
          setIsOpen={setIsNewOpen}
          refetch={refetch}
        />
      )}
    </>
  );
}
