'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EditProject from '@app/(navbar)/projects/[id]/components/EditProjectModal';
import { CumulativeRiskMatrix } from '@components/RiskMatrix/CumulativeRiskMatrix';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { Button } from '@components/ui/button';
import { useProject } from '@lib/api/hooks';
import dayjs from 'dayjs';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Risks } from './components/Risks';
import { ProjectEmployee } from './components/members';

export function Project() {
  const pathName = usePathname();
  const projectId = pathName?.split('/projects/')[1];
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'risks'>(
    'overview',
  );

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

  return (
    <>
      <div className="py-10">
        <div className="flex items-center justify-center">
          <div className="flex w-screen flex-col items-center justify-center px-4">
            <Tabs
              value={selectedTab}
              onValueChange={(tab) =>
                setSelectedTab(tab as 'risks' | 'overview')
              }
              className="mb-5"
            >
              <TabsList>
                <TabsTrigger value="risks">Risiskoregister</TabsTrigger>
                <TabsTrigger value="overview">Oversigt</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="flex w-full max-w-screen-2xl gap-4">
                  <div className="sticky top-12 h-fit w-1/3 rounded-md bg-zinc-200 p-4 dark:bg-[#333333] md:top-20">
                    <Button
                      variant="secondary"
                      className="my-4 w-32 justify-end"
                      onClick={() => setIsEditOpen(true)}
                    >
                      Rediger Projekt
                    </Button>
                    <p className="mt-2 font-semibold">Projektnavn:</p>
                    <p className="font-light">{project.name}</p>
                    <p className="mt-2 font-semibold">Beskrivelse:</p>
                    <p className="font-light">{project.description}</p>
                    <div className="mt-2 flex gap-10 font-semibold">
                      <p>
                        Dato for oprettelse:
                        <br />
                        <span className="font-light">
                          {dayjs(project.createdAt).format('DD MMM YYYY')}
                        </span>
                      </p>
                      <p>
                        Slutdato for projekt:
                        <br />
                        <span className="font-light">
                          {dayjs(project.dueDate).format('DD MMM YYYY')}
                        </span>
                      </p>
                    </div>
                    <p className="mt-2">Budgettet for projektet:</p>
                    <p className="font-light">{project.budget} kr.</p>
                    <div className="mt-10">
                      <CumulativeRiskMatrix risks={project.risks} />
                    </div>
                  </div>
                  <div className="h-fit w-2/3 overflow-y-auto rounded-md bg-zinc-200 p-4 dark:bg-[#333333]">
                    <ProjectEmployee project={project} refetch={refetch} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="risks">
                <div className="w-full overflow-y-auto rounded-md bg-zinc-200 p-4 dark:bg-[#333333]">
                  <Risks project={project} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
