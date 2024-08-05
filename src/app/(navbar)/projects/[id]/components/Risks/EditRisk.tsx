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
import { useEmployees } from '@lib/api/hooks';
import { type UpdateRiskForm } from '@lib/api/types/risk';
import { RiskStatus, type Project, type Risk, type User } from '@models';
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateRiskForm>({
    defaultValues: {
      description: riskElement.description,
      probability: riskElement.probability ?? null,
      consequence: riskElement.consequence ?? null,
      status: riskElement.status,
      comment: riskElement.comment,
      activity: riskElement.activity,
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
            Edit Risk
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black dark:text-white">
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-5">
              <div className="w-full">
                <Label htmlFor="description">Description</Label>
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
                  // variant="bordered"
                  // errorMessage={errors.description?.message}
                  // error={!!errors.description}
                />
              </div>
            </div>
            <div className="flex w-full gap-5">
              <div className="w-full">
                <Label htmlFor="activity">Activity</Label>
                <Input
                  className="mt-2 w-full"
                  {...register('activity')}
                  id="activity"
                  value={watch('activity')}
                  // variant="bordered"
                  // errorMessage={errors.activity?.message}
                  // error={!!errors.activity}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="comment">Comment</Label>
                <Input
                  className="mt-2 w-full"
                  {...register('comment')}
                  id="comment"
                  value={watch('comment')}
                  // variant="bordered"
                  // errorMessage={errors.comment?.message}
                  // error={!!errors.comment}
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-5">
              <div className="flex w-1/3 gap-4">
                <div className="w-full">
                  <Label htmlFor="probability">Probability</Label>
                  <Input
                    className="mt-2"
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
                  <Label htmlFor="consequence">Consequence</Label>
                  <Input
                    className="mt-2"
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
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span>Status {'->'}</span>
                  <SingleDropdown
                    options={StatusDropdownOptions}
                    buttonLabel={
                      StatusDropdownOptions.find(
                        (option) => option.value === watch('status'),
                      )?.label ?? 'Select Status'
                    }
                    selectedValue={watch('status')}
                    setSelectedValue={(value) =>
                      setValue('status', value as RiskStatus)
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>Risk Owner {'->'}</span>
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
                          )?.email
                        : 'Select Employee'
                    }
                    selectedValue={watch('riskOwnerUserId')}
                    setSelectedValue={(value) =>
                      value && setValue('riskOwnerUserId', value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => setRiskBeingEdited(null)}
          >
            Close
          </Button>
          <Button variant="default" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
