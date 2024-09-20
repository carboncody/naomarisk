'use client';

import EditRisk from '@app/(navbar)/projects/[id]/components/Risks/EditRisk';
import { SingleRiskMatrix } from '@components/RiskMatrix/SingleRiskMatrix';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { Button } from '@components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet';
import { useRisk } from '@lib/api/hooks/risks';
import { type Risk } from '@models';
import dayjs from 'dayjs';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaComment } from 'react-icons/fa6';
import { Comments } from './components/comments';

export function Risk() {
  const pathName = usePathname();
  const riskId = pathName?.split('/risk/')[1];
  const [riskBeingEdited, setRiskBeingEdited] = useState<Risk | null>(null);

  const {
    data: risk,
    error,
    isLoading,
    isRefetching,
    refetch,
  } = useRisk(riskId ?? '');

  if (isLoading && !isRefetching) {
    return (
      <div className="h-[80vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if ((!riskId || error) ?? !risk) {
    return <Error statusCode={404} title="Invalid risk id in the URL" />;
  }

  const riscscore = (risk.consequence ?? 0) * (risk.probability ?? 0);

  return (
    <>
      <div className="py-10">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4">
          <Button className="w-20" onClick={() => window.history.back()}>
            {'<- '}Back
          </Button>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="sticky top-12 h-fit w-1/3 rounded-md border p-4 dark:border-transparent dark:bg-zinc-900 md:top-20">
              <div className="flex justify-between gap-4">
                <Button
                  variant="default"
                  className="mb-4 "
                  onClick={() => setRiskBeingEdited(risk)}
                >
                  Rediger Risiko
                </Button>
                <Sheet>
                  <Button variant="default">
                    <SheetTrigger className="gp-2 flex">
                      <div className="flex items-center p-2">
                        <span>
                          <FaComment className="mr-2 h-4 w-4" />
                        </span>
                        <span>Kommentér</span>
                      </div>
                    </SheetTrigger>
                  </Button>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-3">
                        <span>
                          <FaComment className="h-4 w-4" />
                        </span>
                        <span>Kommentar</span>
                      </SheetTitle>
                      <SheetDescription>
                        Tilføj en ny kommentar her.
                        <p className="text-Zinc-200 mt-4  text-sm ">
                          <Comments riskId={riskId} comments={risk.comments} />
                        </p>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>

              <div>
                <span className="mt-2 font-semibold">Risk ID:</span>
                <span className="ml-1 font-light">{risk.customId}</span>
              </div>

              <div>
                <p className="mt-2 font-semibold">Beskrivelse:</p>
                <p className="font-light">{risk.description}</p>
              </div>
              <div className="mt-6 flex gap-8">
                <div>
                  <span className="mt-2 font-semibold">Risiko Ejer:</span>
                  <span className="ml-1 font-light">
                    {risk.riskowner?.fullName
                      ? risk.riskowner.fullName
                      : 'Ingen ejer'}
                  </span>
                </div>
                <div>
                  <span className="mt-2 font-semibold">Risiko Manager:</span>
                  <span className="ml-1 font-light">
                    {risk.riskowner ? risk.riskowner.fullName : 'Ingen Manager'}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-10 font-semibold">
                <p>
                  Dato for oprettelse:
                  <br />
                  <p className="font-light">
                    {dayjs(risk.createdAt).format('DD MMM YYYY')}
                  </p>
                </p>

                <p>
                  Sidst ændret:
                  <br />
                  <p className="font-light">
                    {dayjs(risk.updatedAt).format('DD MMM YYYY')}
                  </p>
                </p>
              </div>
              <div className="mt-6 flex gap-10 font-light">
                <p className="flex flex-col">
                  <p>
                    <span className="font-semibold">Konsekvens:</span>
                    <span className="ml-1 font-light">
                      {risk.consequence ?? 'Udefineret'}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Sandsynlighed:</span>
                    <span className="ml-1 font-light">
                      {risk.probability ?? 'Udefineret'}
                    </span>
                  </p>
                </p>

                <p>
                  <span className="font-semibold">Risikoscore:</span>
                  <span className="ml-1 font-light">{riscscore}</span>
                </p>
              </div>
              <div className="mt-4 border-t border-zinc-300 pt-2 dark:border-zinc-700">
                <div className="mt-10">
                  <SingleRiskMatrix risk={risk} />
                </div>
              </div>
            </div>
            <div className="w-2/3 overflow-y-auto  rounded-lg border p-4 font-semibold dark:border-transparent dark:bg-zinc-900">
              <p className="mt-2 flex flex-wrap items-center justify-between">
                <div className="overflow-x-clip truncate ">
                  <span>Aktivitet:</span>
                  <span className="ml-2 font-light">
                    {risk.activity ?? 'Ingen aktivitet'}
                  </span>
                </div>
              </p>
              <hr className="my-4 border-zinc-300 dark:border-zinc-700" />
              <div className="flex w-full items-center gap-2">
                <div className="flex gap-3 ">
                  <span>
                    <span className="font-semibold">Fase:</span>
                    <span className="ml-2 font-light">
                      {risk.projectPhase?.name ?? 'Ingen fase'}
                    </span>
                  </span>
                  <span>
                    <span className="font-semibold">Mitigrerende fase:</span>
                    <span className="ml-2 font-light">
                      {risk.mitigationPhase?.name ?? 'Ingen fase'}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {riskBeingEdited && (
        <EditRisk
          isOpen={!!riskBeingEdited}
          riskElement={riskBeingEdited}
          setRiskBeingEdited={setRiskBeingEdited}
          project={risk.project}
          refetch={refetch}
        />
      )}
    </>
  );
}
