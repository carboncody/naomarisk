'use client';

import { LoadingSpinner } from '@components/ui';
import { Button } from '@components/ui/button';
import { DataTable } from '@components/ui/data-table';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useAdmin, useMyProjects } from '@lib/api/hooks';
import { useAllProjects } from '@lib/api/hooks/projects/useAllProjects';
import { useMe } from '@lib/providers/me';
import { ProjectStatus, type Project } from '@models';
import Error from 'next/error';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ArchiveProject } from './ArchiveProject';
import { EditProject } from './[id]/components/EditProjectModal';
import CreateProjectDialog from './components/CreateProjectDialog';
import { columns } from './components/colums';

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

  if (isFetching) {
    return (
      <div className='flex justify-center items-center h-[80vh]'>
      <LoadingSpinner size={50} />
    </div>
    );
  }

  if (isError) {
    return <Error statusCode={500} message={error.message} />;
  }

  const handleRowClick = (project: Project) => {
    router.push(`/projects/${project.id}`);
  };

  const handleArchive = (project: Project) => {
    setProjectBeingArchived(project);
  };

  // const handleEdit = (project: Project) => {
  //   setIsEditOpen(project);
  // };

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
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as ProjectStatus)}
            className="mb-5"
          >
            <TabsList>
              <TabsTrigger value={ProjectStatus.OPEN}>Åben</TabsTrigger>
              <TabsTrigger value={ProjectStatus.CLOSED}>Lukket</TabsTrigger>
              <TabsTrigger value={'ALL'}>Alle</TabsTrigger>
              <TabsTrigger value={ProjectStatus.ARCHIVED}>
                Arkiveret
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <DataTable
            columns={columns({ handleArchive, setEditingProjectId })}
            data={filteredProjects}
            onRowClick={handleRowClick}
          />
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
