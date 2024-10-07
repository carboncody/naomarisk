'use client';

import {
  ConsequenceDescription,
  ProbabilityDescription,
} from '@components/RiskMatrix/RiskMatrixDescription';
import { SingleRiskMatrix } from '@components/RiskMatrix/SingleRiskMatrix';
import { LoadingSpinner } from '@components/ui';
import { Button } from '@components/ui/button';
import { useRisk } from '@lib/api/hooks/risks';
import type { UpdateRiskForm } from '@lib/api/types/risk';
import { type Risk } from '@models';
import axios from 'axios';
import dayjs from 'dayjs';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaComment } from 'react-icons/fa6';
import { EditRisk } from '../../components/Risks/EditRisk';
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
      <div className="flex h-[80vh] items-center justify-center">
        <LoadingSpinner size={50} />
      </div>
    );
  }

  if ((!riskId || error) ?? !risk) {
    return <Error statusCode={404} title="Invalid risk id in the URL" />;
  }

  const riscscore = (risk.consequence ?? 0) * (risk.probability ?? 0);

  async function onSubmit(data: UpdateRiskForm) {
    try {
      await axios.patch(`/api/risk/${risk?.id}`, data);
      toast.success('Risk updated successfully!');
      void refetch();
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  return (
    <>
      <div className="py-2">
        <div className="max-w-screen-3xl mx-auto flex w-full flex-col gap-4">
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
              </div>

              <div>
                <span className="mt-2 text-muted-foreground">Risk ID:</span>
                <span className="ml-1">{risk.customId}</span>
              </div>

              <div>
                <p className="mt-2 text-muted-foreground">Beskrivelse:</p>
                <p className="mt-2">{risk.description}</p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <div>
                  <span className="mt-2 text-muted-foreground">
                    Risiko Ejer:
                  </span>
                  <span className="ml-1">
                    {risk.riskowner?.fullName
                      ? risk.riskowner.fullName
                      : 'Ingen ejer'}
                  </span>
                </div>
                <div>
                  <span className="mt-2 text-muted-foreground">
                    Risiko Manager:
                  </span>
                  <span className="ml-1">
                    {risk.riskowner ? risk.riskowner.fullName : 'Ingen Manager'}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-10 text-muted-foreground">
                <p>
                  Dato for oprettelse:
                  <br />
                  <p
                    className=">
                    {dayjs(risk.createdAt).format('DD MMM YYYY')}
                  </p>
                </p>

                <p>
                  Sidst ændret:
                  <br />
                  <p className="
                  >
                    {dayjs(risk.updatedAt).format('DD MMM YYYY')}
                  </p>
                </p>
              </div>
              <div className="mt-6 flex gap-10">
                <p className="flex flex-col">
                  <p>
                    <span className="text-muted-foreground">Konsekvens:</span>
                    <span className="ml-1">
                      {risk.consequence ?? 'Udefineret'}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">
                      Sandsynlighed:
                    </span>
                    <span className="ml-1">
                      {risk.probability ?? 'Udefineret'}
                    </span>
                  </p>
                </p>

                <p>
                  <span className="text-muted-foreground">Risikoscore:</span>
                  <span className="ml-1">{riscscore}</span>
                </p>
              </div>
              <div className="mt-4 border-t border-zinc-300 pt-2 dark:border-zinc-700">
                <div className="mt-10">
                  <SingleRiskMatrix
                    probability={risk.probability}
                    consequence={risk.consequence}
                    onCellClick={(score) => {
                      const { probability, consequence } = score;
                      void onSubmit({
                        probability,
                        consequence,
                      } as UpdateRiskForm);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-2/4 overflow-y-auto  rounded-lg border p-4 text-muted-foreground dark:border-transparent dark:bg-zinc-900">
              <div className="flex items-start">
                <span className="text-muted-foreground">Aktivitet:</span>
                <p className="ml-2 whitespace-normal break-words">
                  {risk.activity ?? 'Ingen aktivitet'}
                </p>
              </div>
              <hr className="my-4 h-[0.5px] border-zinc-300 dark:border-zinc-700" />
              <div className="flex w-full items-center justify-center gap-4">
                <div className="w-full md:w-1/2">
                  <label className="mb-2 text-muted-foreground">
                    Tidsmæssig Risiko
                  </label>
                  <div className="mt-2 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <label className="text-muted-foreground">
                        Konsekvens:
                      </label>
                      <span className="ml-2">
                        {risk.timeConsequence ?? 'Udefineret'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <label className="text-muted-foreground">
                        Sandsynlighed:
                      </label>
                      <span className="ml-2">
                        {risk.timeProbability ?? 'Udefineret'}
                      </span>
                    </div>
                  </div>
                  <SingleRiskMatrix
                    probability={risk.timeProbability}
                    consequence={risk.timeConsequence}
                    onCellClick={(score) => {
                      const {
                        probability: timeProbability,
                        consequence: timeConsequence,
                      } = score;
                      void onSubmit({
                        timeProbability: timeProbability,
                        timeConsequence: timeConsequence,
                      } as UpdateRiskForm);
                    }}
                  />
                </div>

                <div className="w-full md:w-1/2">
                  <label className="mb-2 text-muted-foreground">
                    Økonomisk Risiko
                  </label>
                  <div className="mt-2 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <label className="text-muted-foreground">
                        Konsekvens:
                      </label>
                      <span className="ml-2">
                        {risk.economicConsequence ?? 'Udefineret'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <label className="text-muted-foreground">
                        Sandsynlighed:
                      </label>
                      <span className="ml-2">
                        {risk.economicProbability ?? 'Udefineret'}
                      </span>
                    </div>
                  </div>
                  <SingleRiskMatrix
                    probability={risk.economicProbability}
                    consequence={risk.economicConsequence}
                    onCellClick={(score) => {
                      const {
                        probability: economicProbability,
                        consequence: economicConsequence,
                      } = score;
                      void onSubmit({
                        economicProbability: economicProbability,
                        economicConsequence: economicConsequence,
                      } as UpdateRiskForm);
                    }}
                  />
                </div>
              </div>
              <hr className="my-4 h-[0.5px] border-zinc-300 dark:border-zinc-700" />
              <div className=" flex w-full items-center justify-start gap-16">
                <div className="ml-2 flex items-center gap-2">
                  <p className="text-muted-foreground">
                    Fase: {risk.mitigationPhase?.name ?? 'Udefineret'}
                  </p>
                  {/* <SingleDropdown
                    triggerClassName="w-72"
                    options={risk.project.phases.map((phase) => ({
                      label: phase.name,
                      value: phase.id,
                    }))}
                    buttonLabel={'Vælg fase'}
                    selectedValue={risk.projectPhaseId ?? null}
                    setSelectedValue={(value) => {
                      void onSubmit({
                        projectPhaseId: value,
                      });
                    }}
                  /> */}
                </div>
                <div className=" items-center">
                  <p className="text-muted-foreground">
                    Mitigrerende fase: {risk.projectPhase?.name ?? 'Udefineret'}
                  </p>
                  {/* <div className="ml-2"> */}
                  {/* <SingleDropdown
                      triggerClassName="w-72"
                      options={risk.project.phases.map((phase) => ({
                        label: phase.name,
                        value: phase.id,
                      }))}
                      buttonLabel={'Vælg fase'}
                      selectedValue={risk.mitigationPhaseId ?? null}
                      setSelectedValue={(value) => {
                        void onSubmit({
                          mitigationPhaseId: value,
                        });
                      }}
                    /> */}
                  {/* </div> */}
                </div>
              </div>
              <div className="ml-10 mt-10 flex justify-start">
                <div className="pb-5">
                  <p className="font-semibold">Sandsynlighed:</p>
                  <div className="mt-2">
                    {[5, 4, 3, 2, 1].map((probability) => (
                      <div key={probability} className="mb-1 flex">
                        <div className="mr-4 flex w-2 flex-shrink-0 select-none items-center justify-center text-xs  md:text-sm">
                          {probability}
                        </div>
                        <div className="w-60 gap-2 text-sm">
                          {ProbabilityDescription[probability]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="">
                  <p className="font-semibold">Konsekves:</p>
                  <div className="mt-2">
                    {[5, 4, 3, 2, 1].map((consequence) => (
                      <div key={consequence} className="mb-1 flex">
                        <div className="mr-4 flex w-2 flex-shrink-0 select-none items-center justify-center text-xs md:text-sm">
                          {consequence}
                        </div>
                        <div className="w-60 gap-2 text-sm">
                          {ConsequenceDescription[consequence]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/4 overflow-y-auto  rounded-lg border p-4 text-muted-foreground dark:border-transparent dark:bg-zinc-900">
              <span className="mb-2 flex gap-3">
                <FaComment className="h-4 w-4" />
                Tilføj en ny kommentar her.
              </span>
              <p className="text-Zinc-200 mt-4  text-sm ">
                <Comments
                  riskId={riskId}
                  comments={risk.comments}
                  refetch={refetch}
                  onCommentAdded={function (): void {
                    console.log('onCommentAdded');
                  }}
                />
              </p>
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
