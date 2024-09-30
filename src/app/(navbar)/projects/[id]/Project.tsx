'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditProject } from '@app/(navbar)/projects/[id]/components/EditProjectModal';
import { LoadingSpinner } from '@components/ui/LoadSpinner';
import { useProject } from '@lib/api/hooks';
import type { UpdateProjectForm } from '@lib/api/types';
import { ProjectStatus } from '@models';
import axios, { AxiosError } from 'axios';
import Error from 'next/error';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ProjectOverview } from './components/ProjectOverview';
import { ProjectEmployee } from './components/members';
import { PhaseTable } from './components/phase/PhaseTable';
import { Risks } from './components/risks';

export function Project() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const projectId = pathName?.split('/projects/')[1];
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    'overview' | 'risks' | 'employees' | 'phases'
  >('risks');

  const StatusDropdownOptions: { label: string; value: ProjectStatus }[] = [
    { label: 'Åbent', value: ProjectStatus.OPEN },
    { label: 'Lukket', value: ProjectStatus.CLOSED },
    { label: 'Arkiveret', value: ProjectStatus.ARCHIVED },
  ];

  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'risks') {
      setSelectedTab(view);
    }
  }, [searchParams]);

  const {
    data: project,
    error,
    isLoading,
    isRefetching,
    refetch,
  } = useProject(projectId ?? '');

  if (isLoading && !isRefetching) {
    return (
      <div className="h-[80vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if ((!projectId || error) ?? !project) {
    return <Error statusCode={404} title="Project not found in the url" />;
  }

  async function onSubmit(data: UpdateProjectForm) {
    try {
      await axios.patch(`/api/project/${projectId}`, data);
      toast.success('Projektet er opdateret!');
      void refetch();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error('Du har ikke rettigheder til at ændre projekter');
          return;
        }
        toast.error('Noget gik galt -' + error.code);
        return;
      }
      toast.error('Noget gik galt, beklager.');
    }
  }

  return (
    <>
      <div className="flex flex-col rounded-lg">
        <Tabs
          value={selectedTab}
          onValueChange={(tab) =>
            setSelectedTab(tab as 'risks' | 'overview' | 'employees' | 'phases')
          }
          className="mb-5"
        >
          <TabsList>
            <TabsTrigger className="w-56" value="risks">
              Risiskoregister
            </TabsTrigger>
            <TabsTrigger className="w-56" value="overview">
              Oversigt
            </TabsTrigger>
            <TabsTrigger className="w-56" value="employees">
              Medarbejder tildeling
            </TabsTrigger>
            <TabsTrigger className="w-56" value="phases">
              Projektfase
            </TabsTrigger>
          </TabsList>
          <TabsContent value="risks">
            <Risks project={project} />
          </TabsContent>
          <TabsContent value="employees">
            <ProjectEmployee project={project} refetch={refetch} />
          </TabsContent>
          <TabsContent value="overview">
            <ProjectOverview
              statusOptions={StatusDropdownOptions}
              setIsEditOpen={setIsEditOpen}
              project={project}
              onSubmit={onSubmit}
            />
          </TabsContent>
          <TabsContent value="phases">
            <PhaseTable project={project} refetch={refetch} />
          </TabsContent>
        </Tabs>
      </div>
      {isEditOpen && (
        <EditProject
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          project={project}
          refetch={refetch}
        />
      )}
    </>
  );
}
