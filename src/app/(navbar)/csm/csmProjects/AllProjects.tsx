'use client';

import { LoadingSpinner } from '@components/ui';
import { Button } from '@components/ui/button';
import { DataTable } from '@components/ui/data-table';
import { useAdmin } from '@lib/api/hooks';
import { useMyCsmProjects } from '@lib/api/hooks/csm';
import { useAllCsmProjects } from '@lib/api/hooks/csm/useAllCsmProjects';
import { useMe } from '@lib/providers/me';
import { type CsmProject } from '@models';
import Error from 'next/error';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { columns } from '../components/colums';
import CreateCsmProjectDialog from './CreateCsmProjectDialog';

export function AllProjects() {
  const [projectBeingArchived, setProjectBeingArchived] =
    useState<CsmProject | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const all = searchParams.get('status');
  const me = useMe();
  const isAdmin = useAdmin(me);
  const router = useRouter();

  const [isNewOpen, setIsNewOpen] = useState(false);

  const {
    data: allProjects,
    isFetching,
    isRefetching,
    isError,
    error,
    refetch,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = all && isAdmin ? useAllCsmProjects() : useMyCsmProjects();

  const projectBeingEdited = useMemo(() => {
    return allProjects?.find((project) => project.id === editingProjectId);
  }, [allProjects, editingProjectId]);

  if (isFetching && !isRefetching) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  if (isError) {
    return <Error statusCode={500} message={error.message} />;
  }

  const handleRowClick = (project: CsmProject) => {
    router.push(`/csm/${project.id}`);
  };

  return (
    <>
      <div className="justify-top flex flex-col items-center overflow-y-auto px-4">
        <div className="mb-4 mt-10 flex w-full justify-between">
          <p className="text-3xl font-semibold">CSM Projekter</p>
          {isAdmin && (
            <Button onClick={() => setIsNewOpen(true)}>Tilføj</Button>
          )}
        </div>
        <div className="w-full rounded-lg border border-zinc-300 p-4 dark:border-transparent dark:bg-zinc-900">
          <DataTable
            tableId="CsmProjectTable"
            columns={columns({ setEditingProjectId })}
            data={allProjects}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      {/* {projectBeingEdited && (
        <EditProject
          isOpen={!!projectBeingEdited}
          setIsOpen={() => setEditingProjectId(null)}
          project={projectBeingEdited}
          refetch={refetch}
        />
      )} */}

      {/* <ArchiveProject
        isOpen={!!projectBeingArchived}
        projectElement={projectBeingArchived}
        setProjectBeingArchived={setProjectBeingArchived}
        refetch={refetch}
      /> */}

      <CreateCsmProjectDialog
        myId={me.id}
        isOpen={isNewOpen}
        setIsOpen={setIsNewOpen}
        refetch={refetch}
      />
    </>
  );
}
