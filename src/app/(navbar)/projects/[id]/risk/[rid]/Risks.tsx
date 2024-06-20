'use client';

import EditRisk from '@app/(navbar)/projects/[id]/components/Risks/EditRisk';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { useRisk } from '@lib/api/hooks/risks';
import { type Risk } from '@models';
import { Button } from '@nextui-org/react';
import dayjs from 'dayjs';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
    return <LoadingSpinner size="lg" />;
  }

  if ((!riskId || error) ?? !risk) {
    return <Error statusCode={404} title="Invalid risk id in the URL" />;
  }

  console.log(risk);

  return (
    <>
      <div className="py-10">
        <div className="flex items-center justify-center">
          <div className="flex w-screen flex-col items-center justify-center px-4">
            <div className="flex w-full max-w-screen-2xl gap-4">
              <div className="sticky top-12 h-fit w-1/3 rounded-md bg-[#333333] p-4 md:top-20">
                <Button
                  className="my-4 w-28 justify-end"
                  onClick={() => setRiskBeingEdited(risk)}
                >
                  Rediger Risk
                </Button>
                <div>
                  <span className="mt-2 font-semibold">Risk ID:</span>
                  <span className="ml-1 font-thin">{risk.customId}</span>
                </div>
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
                    Sidst ændret:
                    <br />
                    <p className="font-thin">
                      {dayjs(risk.updatedAt).format('DD MMM YYYY')}
                    </p>
                  </p>
                </div>
                <div className="mt-2 flex gap-10 font-thin">
                  <p>
                    <span className="font-semibold">Konsekvens:</span>
                    <span className="ml-1 font-thin">{risk.consequence}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Sandsynlighed:</span>
                    <span className="ml-1 font-thin">{risk.probability}</span>
                  </p>
                </div>
                <div className="mt-2 flex gap-10 font-semibold">
                  <p>
                    kommentar:
                    <br />
                    <span className="font-thin">{risk.comment}</span>
                  </p>

                  <p>
                    Aktivitet:
                    <br />
                    <span className="font-thin">{risk.activity}</span>
                  </p>
                </div>
              </div>
              <div className="w-2/3 overflow-y-auto rounded-md bg-[#333333] p-4">
                <div className="h-full w-full border bg-white/50">
                  Dashboard
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
