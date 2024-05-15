'use client';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { AllRisk } from '../../../../components/risk/Risk';
// import { useProjectsInCompany } from '@lib/api/hooks';
// import { getProjectFromId } from '@lib/api/project';

export function Project() {
  const pathName = usePathname();
  const projectId = pathName?.split('/projects/')[1];
  // const {
  //   data: projectData,
  //   isFetching,
  //   isError,
  //   error,
  //   refetch,
  // } = useProjectsInCompany();

  // if (isFetching) {
  //   return (
  //     <div className="flex min-h-full w-full items-center justify-center">
  // <LoadingSpinner size="lg" />

  //     </div>
  //   );
  // }

  // if (isError) {
  //   <Error statusCode={500} message={error.message} />;
  // }
  // const data = getProjectFromId(id: projectId);

  if (!projectId) {
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
            <Tab key="Riscs" title="Risici">
              <Card className="bg-[#333333] text-white">
                <CardBody className="h-[45rem] overflow-y-clip">
                  <AllRisk />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="employees" title="Medarbejder">
              <Card className="bg-[#333333] text-white">
                <CardBody>employees on this project</CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
