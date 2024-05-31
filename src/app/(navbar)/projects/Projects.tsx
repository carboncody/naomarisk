'use client';

import NewProjectDialog from '@app/(navbar)/projects/components/NewProjectDialog';
import { Backbutton } from '@components/ui/BackButton';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { useMyProjects } from '@lib/api/hooks';
import { Button } from '@nextui-org/react';
import Error from 'next/error';
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
  } = useMyProjects();

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
      <div className="justify-top flex min-h-screen flex-col items-center">
        <div className="mb-4 mt-40 flex w-full justify-between">
          <p className="text-3xl font-semibold">Mine Projekter</p>
          <Button className="w-32" onClick={() => setIsNewOpen(true)}>
            Tilføj
          </Button>
        </div>
        <ProjectTable projects={allProjects ?? []} />
        <div className=" justify-flex flex justify-center">
          <Backbutton href={'/'} />
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
