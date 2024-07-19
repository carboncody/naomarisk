'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { Button } from '@components/ui/button';
import { useEmployees } from '@lib/api/hooks';
import type { Project } from '@models';
import { useState } from 'react';
import { MembersModal } from './MembersModal';
import { ProjectEmployeeTable } from './ProjectEmployeeTable';

interface ProjectEmployeeProps {
  project: Project;
  refetch: () => void;
}

export function ProjectEmployee({
  project,
  refetch: refetchProject,
}: ProjectEmployeeProps) {
  const [isNewOpen, setIsNewOpen] = useState(false);

  const { data: allEmployees, isFetching, isError } = useEmployees();

  if (isFetching) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !allEmployees) {
    <div>Something went wrong</div>;
  }

  const projectMemberIds: string[] = project.projectUsers.map(
    (pu) => pu.userId,
  );

  return (
    <>
      <div className="justify-top flex flex-col items-center overflow-y-auto text-white">
        <div className="mb-4 flex w-full items-center justify-between">
          <p className="text-3xl font-semibold">Medarbjedere i dette projekt</p>
          <Button
            className="my-4 justify-end font-semibold"
            onClick={() => setIsNewOpen(true)}
          >
            Tilføj / fjern medlemmer
          </Button>
        </div>
        <ProjectEmployeeTable
          projectMemberIds={projectMemberIds}
          employees={allEmployees ?? []}
        />
      </div>
      {isNewOpen && (
        <MembersModal
          isOpen={isNewOpen}
          projectId={project.id}
          setIsOpen={setIsNewOpen}
          refetchProject={refetchProject}
          projectMemberIds={projectMemberIds}
          employees={allEmployees ?? []}
        />
      )}
    </>
  );
}
