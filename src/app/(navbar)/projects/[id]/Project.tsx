/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client';

import EditProject from '@components/EditProject';
import { ProjectEmployee } from '@components/projectEmployee/ProjectEmployee';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { useProject } from '@lib/api/hooks';
import { Button, Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function formatDate(dateString: string | number | Date) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('dk-DK', options);
}

export function Project() {
  const pathName = usePathname();
  const projectId = pathName?.split('/projects/')[1];
  const [isNewOpen, setIsNewOpen] = useState(false);

  const { data: project, error, isLoading } = useProject(projectId ?? '');

  if (isLoading) {
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
              <Card className="bg-[#333333] text-white">
                <CardBody>
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
                        {formatDate(project.createdAt)}
                      </p>
                    </p>

                    <p>
                      Slutdato for projekt:
                      <br />
                      <p className="font-thin">{formatDate(project.dueDate)}</p>
                    </p>
                  </div>
                  <p className="mt-2 font-semibold">Budgettet for projektet:</p>
                  <p className="font-thin">{project.budget} kr.</p>

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
