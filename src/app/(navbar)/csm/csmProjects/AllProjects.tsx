'use client';

import { EditProject } from '@app/(navbar)/projects/[id]/components/EditProjectModal';
import { ArchiveProject } from '@app/(navbar)/projects/ArchiveProject';
import CreateProjectDialog from '@app/(navbar)/projects/components/CreateProjectDialog';
import { LoadingSpinner } from '@components/ui';
import { Button } from '@components/ui/button';
import { DataTable } from '@components/ui/data-table';
import { useAdmin, useMyProjects } from '@lib/api/hooks';
import { useAllProjects } from '@lib/api/hooks/projects/useAllProjects';
import { useMe } from '@lib/providers/me';
import { ProjectStatus, type Project } from '@models';
import Error from 'next/error';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

export function AllProjects() {
  const [projectBeingArchived, setProjectBeingArchived] =
    useState<Project | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ProjectStatus | 'ALL'>(
    ProjectStatus.OPEN,
  );

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
  } = all && isAdmin ? useAllProjects() : useMyProjects();

  const filteredProjects = useMemo(() => {
    if (allProjects) {
      if (activeTab === 'ALL') {
        return allProjects;
      } else {
        return allProjects.filter((project) => project.status === activeTab);
      }
    }

    return [];
  }, [allProjects, activeTab]);

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

  const handleRowClick = (project: Project) => {
    router.push(`/csm/${project.id}`);
  };

  const handleArchive = (project: Project) => {
    setProjectBeingArchived(project);
  };

  return (
    <>
      <div className="justify-top flex flex-col items-center overflow-y-auto px-4">
        <div className="mb-4 mt-10 flex w-full justify-between">
          <p className="text-3xl font-semibold">CSM Projekter</p>
          {isAdmin && (
            <Button onClick={() => toast.error('funktion under udvikling')}>
              Tilføj
            </Button>
          )}
        </div>
        <div className="w-full rounded-lg border border-zinc-300 p-4 dark:border-transparent dark:bg-zinc-900">
          <DataTable
            tableId="projectTable"
            columns={[]}
            // columns={columns({ handleArchive, setEditingProjectId })}
            data={filteredProjects}
            onRowClick={handleRowClick}
          />
          <span className="w-full justify-center text-center">Ingen data</span>
        </div>
      </div>

      {projectBeingEdited && (
        <EditProject
          isOpen={!!projectBeingEdited}
          setIsOpen={() => setEditingProjectId(null)}
          project={projectBeingEdited}
          refetch={refetch}
        />
      )}

      <ArchiveProject
        isOpen={!!projectBeingArchived}
        projectElement={projectBeingArchived}
        setProjectBeingArchived={setProjectBeingArchived}
        refetch={refetch}
      />

      <CreateProjectDialog
        myId={me.id}
        isOpen={isNewOpen}
        setIsOpen={setIsNewOpen}
        refetch={refetch}
      />
    </>
  );
}
