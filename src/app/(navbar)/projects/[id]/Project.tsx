'use client';

import EditProject from '@app/(navbar)/projects/[id]/components/EditProjectModal';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { useProject } from '@lib/api/hooks';

import { Button, Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import dayjs from 'dayjs';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ProjectEmployee } from './components/members';
import { Risks } from './components/risk';

export function Project() {
  const pathName = usePathname();
  const projectId = pathName?.split('/projects/')[1];
  const [isNewOpen, setIsNewOpen] = useState(false);

  const {
    data: project,
    error,
    isLoading,
    isRefetching,
    refetch,
  } = useProject(projectId ?? '');

  if (isLoading && !isRefetching) {
    return <LoadingSpinner size="lg" />;
  }

  if ((!projectId || error) ?? !project) {
    return <Error statusCode={404} title="Project not found in the url" />;
  }

  return (
    <div className="pt-20">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-4/5 flex-col items-center justify-center">
          <Tabs aria-label="Options">
            <Tab key="overview" title="Oversigt">
              <Card className="bg-[#212020] text-white">
                <CardBody>
                  <div className=" flex gap-4">
                    <div className="rounded-md bg-[#333333] p-4">
                      <Button
                        className="my-4 w-32 justify-end"
                        onClick={() => setIsNewOpen(true)}
                      >
                        Rediger Projekt
                      </Button>
                      <p className="mt-2 font-semibold">Projektnavn:</p>
                      <p className="font-thin">{project.name}</p>
                      <p className="mt-2 font-semibold">Beskrivelse:</p>
                      <p className="font-thin">{project.description}</p>
                      <div className="mt-2 flex gap-10 font-semibold">
                        <p>
                          Dato for oprettelse:
                          <br />
                          <p className="font-thin">
                            {dayjs(project.createdAt).format('DD MMM YYYY')}
                          </p>
                        </p>

                        <p>
                          Slutdato for projekt:
                          <br />
                          <p className="font-thin">
                            {dayjs(project.dueDate).format('DD MMM YYYY')}
                          </p>
                        </p>
                      </div>
                      <p className="mt-2 font-semibold">
                        Budgettet for projektet:
                      </p>
                      <p className="font-thin">{project.budget} kr.</p>

                      {isNewOpen && (
                        <EditProject
                          isOpen={isNewOpen}
                          setIsOpen={setIsNewOpen}
                          project={project}
                          refetch={refetch}
                        />
                      )}
                    </div>
                    <div className="h-[45rem] w-[1000px] overflow-y-clip rounded-md bg-[#333333] p-4">
                      <ProjectEmployee project={project} refetch={refetch} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Riscs" title="Risici">
              <Card className="bg-[#333333] text-white">
                <CardBody className="h-[45rem] w-[1500px] items-center ">
                  <Risks project={project} />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
