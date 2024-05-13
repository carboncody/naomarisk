'use client';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
// import { getProjectFromId } from '@lib/api/project';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

export function Project() {
  const pathName = usePathname();
  const projectId = pathName?.split('/projects/')[1];
  // const {
  //   data: allProjects,
  //   isFetching,
  //   isError,
  //   error,
  //   refetch,
  // } = getProjectFromId();

  if (!projectId) {
    return <Error statusCode={404} title="Project not found in the url" />;
  }

  return (
    <div className="pt-20">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-4/5 flex-col items-center justify-center">
          <Tabs aria-label="Options">
            <Tab key="overview" title="Oversigt">
              <Card>
                <CardBody>
                  <p>ProjektID: {JSON.stringify(projectId)}</p>
                  <p className="mt-2">Projektnavn:</p>
                  <p className="mt-2">Beskrivelse:</p>
                  <div className="mt-2 flex gap-10">
                    <p>Dato for oprettelse:</p>
                    <p>Slutdato for projekt:</p>
                  </div>
                  <p className="mt-2">Budgettet for projektet:</p>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Riscs" title="Risks">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="employees" title="Medarbejder">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
