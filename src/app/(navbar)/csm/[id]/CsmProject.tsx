'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditProject } from '@app/(navbar)/projects/[id]/components/EditProjectModal';
import { ProjectEmployee } from '@app/(navbar)/projects/[id]/components/members';
import { LoadingSpinner } from '@components/ui';
import { Button } from '@components/ui/button';
import { useProject } from '@lib/api/hooks';
import type { UpdateProjectForm } from '@lib/api/types';
import { ProjectStatus } from '@models';
import axios, { AxiosError } from 'axios';
import Error from 'next/error';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { farelogTable } from '../csmOverview/farelogTable';
import { CsmProjectOverview } from './project/CsmProjectOverview';

export function CsmProject() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const projectId = pathName?.split('/csm/')[1];
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    'overview' | 'farelog' | 'employees' | 'timeline'
  >('overview');

  const StatusDropdownOptions: { label: string; value: ProjectStatus }[] = [
    { label: 'Åbent', value: ProjectStatus.OPEN },
    { label: 'Lukket', value: ProjectStatus.CLOSED },
    { label: 'Arkiveret', value: ProjectStatus.ARCHIVED },
  ];

  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'farelog') {
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
      <div className="flex h-[80vh] items-center justify-center">
        <LoadingSpinner size={50} />
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
      <div className="flex justify-center pb-5 text-3xl font-semibold">
        <div>
          Naoma {'  '}
          <span className="text-red-500">F</span>
          areLog
        </div>
      </div>
      <div className="flex flex-col rounded-lg">
        <Tabs
          value={selectedTab}
          onValueChange={(tab) =>
            setSelectedTab(
              tab as 'farelog' | 'overview' | 'employees' | 'timeline',
            )
          }
          className="mb-5"
        >
          <TabsList>
            <TabsTrigger className="w-56" value="farelog">
              Farelog
            </TabsTrigger>
            <TabsTrigger className="w-56" value="overview">
              Oversigt
            </TabsTrigger>
            <TabsTrigger className="w-56" value="timeline">
              Tidslinje
            </TabsTrigger>
            <TabsTrigger className="w-56" value="employees">
              Medarbejder tildeling
            </TabsTrigger>
          </TabsList>
          <TabsContent value="farelog">
            {/* <Risks project={project} /> */}
            <h1 className="pb-4 pt-4 text-xl font-bold">
              Eksempel på en farelog tabel
            </h1>
            <div className=" flex justify-between">
              <div>
                <Tabs className="mb-5">
                  <TabsList>
                    <TabsTrigger value={ProjectStatus.OPEN}>Åben</TabsTrigger>
                    <TabsTrigger value={ProjectStatus.CLOSED}>
                      Lukket
                    </TabsTrigger>
                    <TabsTrigger value={'ALL'}>Alle</TabsTrigger>
                    <TabsTrigger value={ProjectStatus.ARCHIVED}>
                      Arkiveret
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div>
                <Button
                  variant="secondary"
                  onClick={() => toast.error('funktion under udvikling')}
                >
                  Tilføj Log
                </Button>
              </div>
            </div>
            {farelogTable()}
          </TabsContent>
          <TabsContent value="employees">
            <ProjectEmployee project={project} refetch={refetch} />
          </TabsContent>
          <TabsContent value="overview">
            <CsmProjectOverview
              statusOptions={StatusDropdownOptions}
              setIsEditOpen={setIsEditOpen}
              project={project}
              onSubmit={onSubmit}
            />
          </TabsContent>
          <TabsContent value="timeline">
            <div className="h-full w-full p-4">
              <span className="pb-4"> Eksemel på en tidslinje</span>
              {/* <PhaseTable project={project} refetch={refetch} /> */}
              <iframe
                className="h-[500px] w-full "
                src="https://uploads.linear.app/ba36e46e-8241-4447-b145-6c2c8c5becdb/197e4827-15e8-4a9f-ade7-ef813dec99b7/045cd60a-3331-405b-bb80-c1788615ca39"
              ></iframe>
              <div className="flex gap-2">
                <iframe
                  className="h-[500px] w-full "
                  src="https://uploads.linear.app/ba36e46e-8241-4447-b145-6c2c8c5becdb/e26245ff-869e-4b26-8001-c7be30970f8f/1d651c54-dff5-4dff-896f-7b4666810fcc"
                ></iframe>
                <iframe
                  className="h-[500px] w-full "
                  src="https://uploads.linear.app/ba36e46e-8241-4447-b145-6c2c8c5becdb/a3b3cd5d-5ac6-48ee-997a-58aed2812f14/6c7c737e-33e1-45d4-bdd6-6eceb32060a0"
                ></iframe>
              </div>
            </div>
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
