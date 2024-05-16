'use client';

import EditProject from '@components/EditProject';
import { ProjectEmployee } from '@components/projectEmployee/ProjectEmployee';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { useProject } from '@lib/api/hooks';
import { Button, Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Project() {
  const pathName = usePathname();
  const projectId = pathName?.split('/projects/')[1];
  const [isNewOpen, setIsNewOpen] = useState(false);

  const { data: project, error, isLoading } = useProject(projectId ?? '');

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  } else {
    console.log('project-----------------------:', project);
    console.log(
      'project description-----------------------:',
      project?.description,
    );
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
              <Card className="bg-[#333333] text-white">
                <CardBody>
                  <Button
                    className="my-4 w-32 justify-end"
                    onClick={() => setIsNewOpen(true)}
                  >
                    Rediger Projekt
                  </Button>
                  <p className="mt-2">Projektnavn:</p>
                  {project.name}
                  <p className="mt-2">Beskrivelse:</p>
                  {project.description}
                  <div className="mt-2 flex gap-10">
                    <p>Dato for oprettelse:</p>
                    {project.createdAt?.toDateString()}
                    <p>Slutdato for projekt:</p>
                    {project.dueDate?.toDateString()}
                  </div>
                  <p className="mt-2">Budgettet for projektet:</p>
                  {project.budget}

                  {isNewOpen && (
                    <EditProject isOpen={isNewOpen} setIsOpen={setIsNewOpen} />
                  )}
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Riscs" title="Risici">
              <Card className="bg-[#333333] text-white">
                <CardBody className="h-[45rem] overflow-y-clip">
                  {/* <AllRisk risks={project.risks} /> */}
                </CardBody>
              </Card>
            </Tab>
            <Tab key="employees" title="Medarbejder">
              <Card className="bg-[#333333] text-white">
                <ProjectEmployee />
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
