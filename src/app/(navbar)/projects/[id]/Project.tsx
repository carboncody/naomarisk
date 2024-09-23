'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EditProject from '@app/(navbar)/projects/[id]/components/EditProjectModal';
import { SingleDropdown } from '@components/ui';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { Button } from '@components/ui/button';
import { useProject } from '@lib/api/hooks';
import type { UpdateProjectForm } from '@lib/api/types';
import { ProjectStatus } from '@models';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import Error from 'next/error';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ProjectRiskMatrix } from './components/ProjectRiskMatrix';
import { RiskPieChart } from './components/RiskPieChart';
import { Risks } from './components/Risks';
import { RiskChart } from './components/Risks/RiskChart';
import { ProjectEmployee } from './components/members';
import { PhaseTable } from './components/phase/PhaseTable';

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
    { label: 'Planlægning', value: ProjectStatus.PLANNING },
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
      <div className="p-10">
        <div className="items-left justify-left flex">
          <div className="items-left justify-left flex w-screen flex-col rounded-lg px-4">
            <Tabs
              value={selectedTab}
              onValueChange={(tab) =>
                setSelectedTab(
                  tab as 'risks' | 'overview' | 'employees' | 'phases',
                )
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
                    <div className="rounded-lg border bg-white p-6 shadow dark:border-transparent dark:bg-zinc-900 dark:text-white ">
                      <h2 className="mb-4 text-2xl font-bold">
                        Projekt Information
                      </h2>

                      <div className="overflow-x-auto">
                        <div className="w-full">
                          {/* Projektnavn */}
                          <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                            <span className="text-lg font-semibold">
                              Projektnavn
                            </span>
                            <p className="w-4/5 text-base font-light">
                              {project.name}
                            </p>
                          </div>
                          <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                            <span className="text-lg font-semibold">
                              Beskrivelse
                            </span>
                            <p className="w-4/5 text-base font-light">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                            <span className="text-lg font-semibold">
                              Projektleder
                            </span>
                            <p className="w-4/5 text-base font-light">
                              {project.projectUsers[0]?.user.fullName}
                            </p>
                          </div>
                          <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                            <span className="text-lg font-semibold">
                              Budget for projektet
                            </span>
                            <p className="w-4/5 text-base font-light">
                              {project.budget} kr.
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 dark:border-zinc-700">
                            <span className="text-lg font-semibold">
                              Dato for oprettelse
                            </span>
                            <p className="w-4/5 text-base font-light">
                              {dayjs(project.createdAt).format('DD.MM.YYYY')}
                            </p>
                          </div>
                          <div className="flex items-center justify-between border-b pb-2 dark:border-zinc-700">
                            <span className="text-lg font-semibold">
                              Slut dato for projektet
                            </span>
                            <p className="w-4/5 text-base font-light">
                              {dayjs(project.dueDate).format('DD.MM.YYYY')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center border-b py-2 dark:border-zinc-700">
                          <span className="w-1/5 text-lg font-semibold">
                            Status for projektet
                          </span>
                          <p className="w-32 text-base font-light">
                            <SingleDropdown
                              triggerClassName="w-96"
                              options={StatusDropdownOptions}
                              buttonLabel={
                                StatusDropdownOptions.find(
                                  (option) => option.value === project.status,
                                )?.label ?? 'Vælg status'
                              }
                              selectedValue={project.status}
                              setSelectedValue={(value) => {
                                if (value) {
                                  void onSubmit({
                                    status: value as ProjectStatus,
                                  });
                                }
                              }}
                            />
                          </p>
                        </div>
                        <div className="mt-5">
                          <p className="mt-4 text-xl font-normal">
                            Risici i projektet: {project.risks.length}
                          </p>
                          <div className="mt-2 flex w-full items-center gap-5">
                            <RiskPieChart project={project} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex w-full flex-col gap-4 md:flex-row">
                      <div className="flex w-full items-center justify-center rounded-xl border shadow dark:border-transparent dark:bg-zinc-900 dark:shadow-none">
                        <ProjectRiskMatrix
                          projectId={project.id}
                          risks={project.risks}
                        />
                      </div>
                      <div className="w-full rounded-xl border shadow dark:border-transparent dark:bg-zinc-900 dark:shadow-none">
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
              <TabsContent value="phases">
                <PhaseTable project={project} refetch={refetch} />
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
