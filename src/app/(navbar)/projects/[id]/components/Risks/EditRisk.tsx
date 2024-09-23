'use client';

import { ScoreDropdown } from '@/components/ui/dropdowns/ScoreDropdown';
import { SingleDropdown } from '@components/ui';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Label } from '@components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Textarea } from '@components/ui/textarea';
import { useEmployees } from '@lib/api/hooks';
import { type UpdateRiskForm } from '@lib/api/types/risk';
import {
  ProjectStatus,
  RiskStatus,
  type Project,
  type Risk,
  type User,
} from '@models';
import { TabsContent } from '@radix-ui/react-tabs';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditRiskProps {
  isOpen: boolean;
  project: Project;
  setRiskBeingEdited: (risk: Risk | null) => void;
  refetch: () => void;
  riskElement: Risk;
}

export default function EditRisk({
  riskElement,
  setRiskBeingEdited,
  project,
  refetch,
  isOpen,
}: EditRiskProps) {
  const { register, handleSubmit, setValue, watch } = useForm<UpdateRiskForm>({
    defaultValues: {
      description: riskElement.description,
      probability: riskElement.probability ?? null,
      consequence: riskElement.consequence ?? null,
      status: riskElement.status,
      activity: riskElement.activity,
      riskOwnerUserId: riskElement.riskOwnerUserId,
      timeProbability: riskElement.timeProbability ?? null,
      timeConsequence: riskElement.timeConsequence ?? null,
      economicConsequence: riskElement.economicConsequence ?? null,
      economicProbability: riskElement.economicProbability ?? null,
    },
  });

  const StatusDropdownOptions: { label: string; value: RiskStatus }[] = [
    { label: 'Open', value: RiskStatus.Open },
    { label: 'Closed', value: RiskStatus.Closed },
  ];

  async function onSubmit(data: UpdateRiskForm) {
    const {
      probability,
      consequence,
      timeConsequence,
      timeProbability,
      economicConsequence,
      economicProbability,
    } = data;

    data.probability = probability ? +probability : null;
    data.consequence = consequence ? +consequence : null;
    data.timeConsequence = timeConsequence ? +timeConsequence : null;
    data.timeProbability = timeProbability ? +timeProbability : null;
    data.economicConsequence = economicConsequence
      ? +economicConsequence
      : null;
    data.economicProbability = economicProbability
      ? +economicProbability
      : null;

    try {
      await axios.patch(`/api/risk/${riskElement.id}`, data);
      toast.success('Risk updated successfully!');
      refetch();
      setRiskBeingEdited(null);
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  const { data: allEmployees, isError } = useEmployees();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'properties'>(
    'overview',
  );

  const projectMembers: User[] | undefined = useMemo(() => {
    const projectMemberIds = project.projectUsers.map((pu) => pu.userId);
    return allEmployees?.filter((employee) =>
      projectMemberIds.includes(employee.id),
    );
  }, [allEmployees, project.projectUsers]);

  if (isError || !allEmployees) {
    return <div>Something went wrong</div>;
  }

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(tab) => setSelectedTab(tab as 'overview' | 'properties')}
      className="mb-5"
    >
      <Dialog open={isOpen} onOpenChange={() => setRiskBeingEdited(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-between pr-4 text-black dark:text-white">
              Rediger Risiko
              <TabsList>
                <TabsTrigger value="overview">Oversigt</TabsTrigger>
                <TabsTrigger value="properties">Egenskaber</TabsTrigger>
              </TabsList>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-black dark:text-white">
            <TabsContent value="overview">
              <div className="flex flex-col gap-4">
                <div className="flex w-full gap-5">
                  <div className="w-full">
                    <Label htmlFor="description">Beskrivelse</Label>
                    <Input
                      className="mt-2 w-full"
                      {...register('description', {
                        required: {
                          value: true,
                          message: 'Description is required',
                        },
                      })}
                      id="description"
                      value={watch('description')}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-5">
                  <div className="w-full">
                    <Label htmlFor="activity">Aktivitet</Label>
                    <Textarea
                      className="mt-2 w-full"
                      {...register('activity')}
                      id="activity"
                      value={watch('activity')}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex w-full items-center justify-between gap-5">
                <div className="flex w-1/2 gap-4">
                  <div className="flex w-full flex-col items-start gap-2">
                    <Label htmlFor="probability">Sansynlighed</Label>
                    <ScoreDropdown
                      label="Vælg Sansynlighed"
                      selectedValue={watch('probability') ?? null}
                      onSelect={(value) => setValue('probability', value)}
                    />
                  </div>
                  <div className="flex w-full flex-col items-start gap-2">
                    <Label htmlFor="consequence">Konsekvens</Label>
                    <ScoreDropdown
                      label="Vælg Konsekvens"
                      selectedValue={watch('consequence') ?? null}
                      onSelect={(value) => setValue('consequence', value)}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <span>Status</span>
                    <SingleDropdown
                      options={StatusDropdownOptions}
                      buttonLabel={
                        StatusDropdownOptions.find(
                          (option) => option.value === watch('status'),
                        )?.label ?? 'Vælg Status'
                      }
                      selectedValue={watch('status') ?? ProjectStatus.PLANNING}
                      setSelectedValue={(value) =>
                        value && setValue('status', value as RiskStatus)
                      }
                    />
                  </div>
                </div>
                <div className="flex w-1/2 flex-col items-start gap-2">
                  <span>Risko Ejer</span>
                  <SingleDropdown
                    options={
                      projectMembers
                        ? projectMembers.map((employee) => ({
                            label: employee.fullName,
                            value: employee.id,
                          }))
                        : []
                    }
                    buttonLabel={
                      projectMembers && watch('riskOwnerUserId')
                        ? projectMembers.find(
                            (employee) =>
                              employee.id === watch('riskOwnerUserId'),
                          )?.email ?? 'Vælg risiko ejer'
                        : 'Vælg risiko ejer'
                    }
                    selectedValue={watch('riskOwnerUserId') ?? null}
                    setSelectedValue={(value) =>
                      setValue('riskOwnerUserId', value)
                    }
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="properties">
              <div className="flex w-full items-center gap-5">
                <div className="flex w-full flex-col items-start gap-2">
                  <span>Fase</span>
                  <SingleDropdown
                    options={project.phases.map((phase) => ({
                      label: phase.name,
                      value: phase.id,
                    }))}
                    buttonLabel={'Vælg fase'}
                    selectedValue={watch('projectPhaseId') ?? null}
                    setSelectedValue={(value) =>
                      setValue('projectPhaseId', value)
                    }
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                  <span>Mitigrerende Fase</span>
                  <SingleDropdown
                    options={project.phases.map((phase) => ({
                      label: phase.name,
                      value: phase.id,
                    }))}
                    buttonLabel={'Vælg mitigrerende Fase'}
                    selectedValue={watch('mitigationPhaseId') ?? null}
                    setSelectedValue={(value) =>
                      setValue('mitigationPhaseId', value)
                    }
                  />
                </div>
              </div>
              <h1 className="mt-8 border-spacing-5 border-b-2 border-zinc-300 text-xl font-semibold dark:border-zinc-300">
                Tid
              </h1>

              <div className="mt-4 flex gap-4">
                <div className="w-full">
                  <Label htmlFor="timeProbability">
                    Sansynlighed i forhold til tid
                  </Label>
                  <div className="mt-2">
                    <ScoreDropdown
                      label="Vælg Sansynlighed"
                      selectedValue={watch('timeProbability') ?? null}
                      onSelect={(value) => setValue('timeProbability', value)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Label htmlFor="timeConsequence">
                    Konsekvens i forhold til tid
                  </Label>
                  <div className="mt-2">
                    <ScoreDropdown
                      label="Vælg Sansynlighed"
                      selectedValue={watch('timeConsequence') ?? null}
                      onSelect={(value) => setValue('timeProbability', value)}
                    />
                  </div>
                </div>
              </div>
              <h1 className="mt-8 border-spacing-5 border-b-2 border-black text-xl font-semibold dark:border-white">
                Økonomi
              </h1>
              <div className="mt-4 flex gap-4">
                <div className="w-full">
                  <Label htmlFor="economicProbability">
                    Økonomisk Sansynlighed
                  </Label>
                  <div className="mt-2">
                    <ScoreDropdown
                      label="Vælg Sansynlighed"
                      selectedValue={watch('economicProbability') ?? null}
                      onSelect={(value) =>
                        setValue('economicProbability', value)
                      }
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Label htmlFor="economicConsequence">
                    Økonomisk Konsekvens
                  </Label>
                  <div className="mt-2">
                    <ScoreDropdown
                      label="Vælg Sansynlighed"
                      selectedValue={watch('economicConsequence') ?? null}
                      onSelect={(value) =>
                        setValue('economicConsequence', value)
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => setRiskBeingEdited(null)}
            >
              Luk
            </Button>
            <Button variant="default" onClick={handleSubmit(onSubmit)}>
              Gem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}
