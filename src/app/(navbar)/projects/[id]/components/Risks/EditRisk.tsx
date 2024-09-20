'use client';

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
import axios from 'axios';
import { useMemo } from 'react';
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
    },
  });

  const StatusDropdownOptions: { label: string; value: RiskStatus }[] = [
    { label: 'Open', value: RiskStatus.Open },
    { label: 'Closed', value: RiskStatus.Closed },
  ];

  async function onSubmit(data: UpdateRiskForm) {
    const { probability, consequence } = data;

    data.probability = probability ? +probability : null;
    data.consequence = consequence ? +consequence : null;

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
    <Dialog open={isOpen} onOpenChange={() => setRiskBeingEdited(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Rediger Risiko
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black dark:text-white">
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
            <div className="flex w-full items-center justify-between gap-5">
              <div className="flex w-1/2 gap-4">
                <div className="w-full">
                  <Label htmlFor="probability">Sansynlighed</Label>
                  <Input
                    className="mt-2 w-full"
                    {...register('probability', {
                      validate: {
                        range: (value) =>
                          value === null ||
                          (value >= 0 && value <= 5) ||
                          'Probability must be between 0 and 5',
                      },
                    })}
                    id="probability"
                    value={watch('probability') ?? ''}
                    type="number"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="consequence">Konsekvens</Label>
                  <Input
                    className="mt-2 w-full"
                    {...register('consequence', {
                      validate: {
                        range: (value) =>
                          value === null ||
                          (value >= 0 && value <= 5) ||
                          'Consequence must be between 0 and 5',
                      },
                    })}
                    id="consequence"
                    value={watch('consequence') ?? ''}
                    type="number"
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
          </div>
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
  );
}
