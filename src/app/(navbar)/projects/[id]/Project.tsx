'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EditProject from '@app/(navbar)/projects/[id]/components/EditProjectModal';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { Button } from '@components/ui/button';
import { useProject } from '@lib/api/hooks';
import dayjs from 'dayjs';
import Error from 'next/error';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProjectRiskMatrix } from './components/ProjectRiskMatrix';
import { Risks } from './components/Risks';
import { ProjectEmployee } from './components/members';
import { RiskChart } from './components/members/RiskChart';

export function Project() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const projectId = pathName?.split('/projects/')[1];
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    'overview' | 'risks' | 'employees'
  >('risks');

  useEffect(() => {
    const view = searchParams.get('view');
    console.info('use effect is being triggered');
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

  return (
    <>
      <div className="p-10 dark:bg-zinc-900 ">
        <div className="items-left justify-left flex">
          <div className="items-left justify-left flex w-screen flex-col rounded-lg px-4 dark:bg-zinc-900">
            <Tabs
              value={selectedTab}
              onValueChange={(tab) =>
                setSelectedTab(tab as 'risks' | 'overview' | 'employees')
              }
              className="mb-5"
            >
              <TabsList>
                <TabsTrigger value="risks">Risiskoregister</TabsTrigger>
                <TabsTrigger value="overview">Oversigt</TabsTrigger>
                <TabsTrigger value="employees">
                  Medarbejdertildeling
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="flex w-full gap-4">
                  <div className="sticky top-12 h-fit w-full rounded-md p-4 md:top-20">
                    <Button
                      variant="secondary"
                      className="my-4 w-32 justify-end"
                      onClick={() => setIsEditOpen(true)}
                    >
                      Rediger Projekt
                    </Button>
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-zinc-950 dark:text-white">
                      <h2 className="mb-4 text-2xl font-bold">
                        Projekt Information
                      </h2>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <tbody className="border-zinc-300">
                            <tr className="border-b dark:border-zinc-700">
                              <th className="px-4 py-2 text-lg font-semibold">
                                Projektnavn
                              </th>
                              <td className="px-4 py-2">{project.name}</td>
                            </tr>
                            <tr className="border-b dark:border-zinc-700">
                              <th className="px-4 py-2 text-lg font-semibold">
                                Beskrivelse
                              </th>
                              <td className="px-4 py-2">
                                {project.description}
                              </td>
                            </tr>
                            <tr className="border-b dark:border-zinc-700">
                              <th className="px-4 py-2 text-lg font-semibold">
                                Dato for oprettelse
                              </th>
                              <td className="px-4 py-2">
                                {dayjs(project.createdAt).format('DD MMM YYYY')}
                              </td>
                            </tr>
                            <tr className="border-b dark:border-zinc-700">
                              <th className="px-4 py-2 text-lg font-semibold">
                                Slutdato for projekt
                              </th>
                              <td className="px-4 py-2">
                                {dayjs(project.dueDate).format('DD MMM YYYY')}
                              </td>
                            </tr>
                            <tr className="border-b dark:border-zinc-700">
                              <th className="px-4 py-2 text-lg font-semibold">
                                Budgettet for projektet
                              </th>
                              <td className="px-4 py-2">
                                {project.budget} kr.
                              </td>
                            </tr>
                            <tr className="border-b dark:border-zinc-700">
                              <th className="px-4 py-2 text-lg font-semibold">
                                Antal risici i projekt
                              </th>
                              <td className="px-4 py-2">
                                {project.risks.length}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-5 flex w-full flex-col gap-4 md:flex-row">
                      <div className="flex w-full items-center justify-center rounded-xl shadow dark:bg-zinc-950 dark:shadow-none">
                        <ProjectRiskMatrix risks={project.risks} />
                      </div>
                      <div className="w-full  rounded-xl  shadow dark:shadow-none">
                        <RiskChart project={project} />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="employees">
                <div className="h-fit w-full overflow-y-auto rounded-xl p-4">
                  <ProjectEmployee project={project} refetch={refetch} />
                </div>
              </TabsContent>
              <TabsContent value="risks">
                <div className="w-full overflow-y-auto rounded-md p-4">
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
