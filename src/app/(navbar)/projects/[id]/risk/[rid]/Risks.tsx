'use client';

import EditRisk from '@app/(navbar)/projects/[id]/components/Risks/EditRisk';
import { SingleRiskMatrix } from '@components/RiskMatrix/SingleRiskMatrix';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { Button } from '@components/ui/button';
import { useRisk } from '@lib/api/hooks/risks';
import { type Risk } from '@models';
import dayjs from 'dayjs';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaComment } from 'react-icons/fa6';
import { Comments } from './components/comments';
import { EditPhase } from '@components/phase/EditPhase';

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

  return (
    <>
      <div className="py-10">
        <div className="flex items-center justify-center">
          <div className="flex w-screen flex-col items-center justify-center px-4">
            <div className="flex w-full max-w-screen-2xl gap-4">
              <div className="sticky top-12 h-fit w-1/3 rounded-md border p-4 dark:border-transparent dark:bg-zinc-900 md:top-20">
                <Button
                  variant="default"
                  className="my-4 w-28 justify-end"
                  onClick={() => setRiskBeingEdited(risk)}
                >
                  Rediger Risk
                </Button>
                <div className="flex gap-8">
                  <div>
                    <span className="mt-2 font-semibold">Risk ID:</span>
                    <span className="ml-1 font-light">{risk.customId}</span>
                  </div>
                  <div>
                    <span className="mt-2 font-semibold">Risiko Ejer:</span>
                    <span className="ml-1 font-light">
                      {risk.riskowner?.fullName
                        ? risk.riskowner.fullName
                        : 'Ingen ejer'}
                    </span>
                  </div>
                </div>
                <p className="mt-2 font-semibold">Beskrivelse:</p>
                <p className="font-light">{risk.description}</p>
                <div className="mt-2 flex gap-10 font-semibold">
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
                <div className="mt-2 flex gap-10 font-light">
                  <p>
                    <span className="font-semibold">Konsekvens:</span>
                    <span className="ml-1 font-light">{risk.consequence}</span>
                  </p>

                  <p>
                    <span className="font-semibold">Sandsynlighed:</span>
                    <span className="ml-1 font-light">{risk.probability}</span>
                  </p>
                </div>
                <div className="mt-4 border-t border-zinc-300 pt-2 font-semibold dark:border-zinc-700">
                  <p className="lex mt-2 flex-wrap items-center gap-2">
                    <span>Aktivitet</span>
                    <span className="ml-2 font-light">
                      {risk.activity ?? 'Ingen'}
                    </span>
                  </p>
                </div>
                <div className="mt-10">
                  <SingleRiskMatrix risk={risk} />
                </div>
              </div>
              <div className="w-2/3 overflow-y-auto rounded-lg border p-4 dark:border-transparent dark:bg-zinc-900">
                <div className="flex w-full items-center gap-2">
                  <FaComment className="h-4 w-4" />
                  Kommentartråd
                </div>
                <p className="text-Zinc-200 mt-4  text-sm">
                  <Comments riskId={riskId} comments={risk.comments} />
                </p>
                <div className='mt-10'>
                  <EditPhase />
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
