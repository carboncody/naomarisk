'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { Button } from '@components/ui/button';
import { DataTable } from '@components/ui/data-table';
import { useAdmin, useMyProjects } from '@lib/api/hooks';
import { useAllProjects } from '@lib/api/hooks/projects/useAllProjects';
import { useMe } from '@lib/providers/me';
import { type Project } from '@models';
import Error from 'next/error';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CreateProjectDialog from './components/CreateProjectDialog';
import { columns } from './components/colums';

export function AllProjects() {
  const searchParams = useSearchParams();
  const all = searchParams.get('status');
  const me = useMe();
  const isAdmin = useAdmin(me);
  const router = useRouter();

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
      <div className="flex h-[80vh] w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <Error statusCode={500} message={error.message} />;
  }

  const handleRowClick = (project: Project) => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <>
      <div className="justify-top flex flex-col items-center overflow-y-auto px-4">
        <div className="mb-4 mt-10 flex w-full justify-between">
          <p className="text-3xl font-semibold">
            {isAdmin && all ? 'Alle' : 'Mine'} Projekter
          </p>
          {isAdmin && (
            <Button onClick={() => setIsNewOpen(true)}>Tilføj</Button>
          )}
        </div>
        <div className="w-full rounded-lg border border-zinc-300 p-4 dark:border-transparent dark:bg-zinc-900">
          <DataTable
            columns={columns}
            data={allProjects ?? []}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
      {isNewOpen && (
        <CreateProjectDialog
          myId={me.id}
          isOpen={isNewOpen}
          setIsOpen={setIsNewOpen}
          refetch={refetch}
        />
      )}
    </>
  );
}
