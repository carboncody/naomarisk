'use client';

import { SingleRiskMatrix } from '@components/RiskMatrix/SingleRiskMatrix';
import { SingleDropdown } from '@components/ui';
import { LoadingSpinner } from '@components/ui/LoadSpinner';
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
      <div className="h-[80vh]">
        <LoadingSpinner size="lg" />
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
                          <Comments
                            riskId={riskId}
                            comments={risk.comments}
                            refetch={refetch}
                          />
                        </p>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
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
            <div className="w-2/3 overflow-y-auto  rounded-lg border p-4 text-muted-foreground dark:border-transparent dark:bg-zinc-900">
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
              <div className="flex w-full items-center justify-start gap-16">
                <span className="ml-2 flex items-center gap-2">
                  <p className="text-muted-foreground">Fase:</p>
                  <SingleDropdown
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
                  />
                </span>
                <span className="flex items-center">
                  <p className="text-muted-foreground">Mitigrerende fase:</p>
                  <span className="ml-2">
                    <SingleDropdown
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
                    />
                  </span>
                </span>
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
