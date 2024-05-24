'use client';

import { Backbutton } from '@components/ui/BackButton';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { useRisks } from '@lib/api/hooks/risks';

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import dayjs from 'dayjs';
import Error from 'next/error';
import { usePathname } from 'next/navigation';

export function Risk() {
  const pathName = usePathname();
  const riskId = pathName?.split('/risk/')[1];
  // const [isNewOpen, setIsNewOpen] = useState(false);

  const { data: risk, error, isLoading, refetch } = useRisks(riskId ?? '');

  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if ((!riskId || error) ?? !risk) {
    return <Error statusCode={404} title="Risk not found in the url" />;
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
                      <p className="mt-2 font-semibold">Risk ID nr. :</p>
                      <p className="font-thin">{risk.customId}</p>
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
                      </div>
                      <div className="mt-5 flex gap-4">
                        <p>
                          Sansynlighed:
                          <br />
                          <p className="font-thin">{risk.probability || 0}</p>
                        </p>
                        <p>
                          Konsekvens:
                          <br />
                          <p className="font-thin">{risk.consequence || 0}</p>
                        </p>
                      </div>

                      <Backbutton href="/projects" />

                      {/* {isNewOpen && (
                        <Editrisk
                          isOpen={isNewOpen}
                          setIsOpen={setIsNewOpen}
                          risk={risk}
                          refetch={refetch}
                        />
                      )} */}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
