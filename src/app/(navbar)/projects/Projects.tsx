'use client';

import NewProjectDialog from '@app/(navbar)/projects/components/NewProjectDialog';
import { Backbutton } from '@components/ui/BackButton';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { useAdmin, useMyProjects } from '@lib/api/hooks';
import { useAllProjects } from '@lib/api/hooks/projects/useAllProjects';
import { useMe } from '@lib/providers/me';
import { Button } from '@nextui-org/react';
import Error from 'next/error';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ProjectTable } from './ProjectTable';

export function AllProjects() {
  const searchParams = useSearchParams();
  const all = searchParams.get('status');
  console.info(searchParams);
  console.info(all);
  const me = useMe();
  const isAdmin = useAdmin(me);

  const [isNewOpen, setIsNewOpen] = useState(false);

  const {
    data: allProjects,
    isFetching,
    isError,
    error,
    refetch,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = all && isAdmin ? useAllProjects() : useMyProjects();

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
      <div className="justify-top flex  min-h-screen flex-col items-center overflow-y-auto">
        <div className="mb-4 mt-40 flex w-full justify-between">
          <p className="text-3xl font-semibold">
            {isAdmin && all ? 'Alle' : 'Mine'} Projekter
          </p>
          {isAdmin && (
            <Button className="w-32" onClick={() => setIsNewOpen(true)}>
              Tilføj
            </Button>
          )}
        </div>
        <ProjectTable projects={allProjects ?? []} />
        <div className=" justify-flex flex justify-center">
          <Backbutton href={'/'} />
        </div>
      </div>
      {isNewOpen && (
        <NewProjectDialog
          myId={me.id}
          isOpen={isNewOpen}
          setIsOpen={setIsNewOpen}
          refetch={refetch}
        />
      )}
    </>
  );
}
