'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { useRisks } from '@lib/api/hooks/risks';

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import dayjs from 'dayjs';
import Error from 'next/error';
import { usePathname } from 'next/navigation';

export function Risk() {
  const pathName = usePathname();
  const projectId = pathName?.split('/risk/')[1];
  // const [isNewOpen, setIsNewOpen] = useState(false);

  const { data: risk, error, isLoading, refetch } = useRisks(projectId ?? '');

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  console.log(risk);

  if ((!projectId || error) ?? !risk) {
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
                      {/* <Button
                        className="my-4 w-32 justify-end"
                        onClick={() => setIsNewOpen(true)}
                      >
                        Rediger Projekt
                      </Button> */}
                      <p className="mt-2 font-semibold">Projektnavn:</p>
                      <p className="font-thin">{risk.name}</p>
                      <p className="mt-2 font-semibold">Beskrivelse:</p>
                      <p className="font-thin">{risk.description}</p>
                      <div className="mt-2 flex gap-10 font-semibold">
                        <p>
                          Dato for oprettelse:
                          <br />
                          <p className="font-thin">
                            {dayjs(risk.createdAt).format('DD MMM YYYY')}
                          </p>
                        </p>

                        <p>
                          Slutdato for projekt:
                          <br />
                          <p className="font-thin">
                            {dayjs(risk.dueDate).format('DD MMM YYYY')}
                          </p>
                        </p>
                      </div>
                      <p className="mt-2 font-semibold">
                        Budgettet for projektet:
                      </p>
                      <p className="font-thin">{risk.budget} kr.</p>

                      {/* {isNewOpen && (
                        <EditProject
                          isOpen={isNewOpen}
                          setIsOpen={setIsNewOpen}
                          project={risk}
                          refetch={refetch}
                        />
                      )} */}
                    </div>
                    {/* <div className="h-[45rem] overflow-y-clip rounded-md bg-[#333333] p-4">
                      <ProjectEmployee project={project} refetch={refetch} />
                    </div> */}
                  </div>
                </CardBody>
              </Card>
            </Tab>
            {/* <Tab key="Riscs" title="Risici">
              <Card className="bg-[#333333] text-white">
                <CardBody className="h-[45rem] overflow-y-clip">
                  <Risks project={project} />
                </CardBody>
              </Card>
            </Tab> */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
