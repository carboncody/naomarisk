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
import { type CreateRiskForm } from '@lib/api/types/risk';
import type { Project, User } from '@models';
import axios, { AxiosError } from 'axios';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface CreateRiskProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
  project: Project;
}

export default function CreateRisk({
  isOpen,
  setIsOpen,
  refetch,
  project,
}: CreateRiskProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateRiskForm>({
    defaultValues: {
      probability: 0,
      consequence: 0,
      status: 'OPEN',
    },
  });

  async function onSubmit(data: CreateRiskForm) {
    try {
      await axios.post('/api/risk/' + project.id, data);
      refetch();
      toast.success('Risk oprettet!');
      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.error(
          'Noget gik galt ved at oprette unik ID til risiko. Prøv venligst igen.',
        );
        return;
      }
      toast.error('Noget gik galt!');
    }
  }

  const { data: allEmployees, isError } = useEmployees();

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Opret Risiko
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black dark:text-white">
          <div className="flex w-full gap-5">
            <div className="mb-3 w-full">
              <Label className="mb-2" htmlFor="Name">
                Beskrivelse
              </Label>
              <Input
                {...register('description', {
                  required: {
                    value: true,
                    message: 'Beskrivelse mangler',
                  },
                })}
              />
            </div>
          </div>
          <div className="mb-3 flex w-full gap-5">
            <div className="w-full">
              <Label className="mb-2" htmlFor="activity">
                Aktivitet
              </Label>
              <Input
                {...register('activity', {
                  required: {
                    value: false,
                    message: 'aktivitet mangler',
                  },
                })}
              />
            </div>
            <div className="w-full">
              <Label className="mb-2" htmlFor="comment">
                Kommentar
              </Label>
              <Input
                {...register('comment', {
                  required: {
                    value: false,
                    message: 'Kommentar mangler',
                  },
                })}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-5">
            <div className="flex w-1/3 gap-4">
              <div>
                <Label className="mb-2" htmlFor="probability">
                  Sandsynlighed
                </Label>
                <Input
                  {...register('probability', {
                    validate: {
                      range: (value) =>
                        value === null ||
                        (value >= 0 && value <= 5) ||
                        'Sandsynlighed skal være mellem 1 og 5',
                    },
                  })}
                />
              </div>
              <div>
                <Label className="mb-2" htmlFor="consequence">
                  Konsekvens
                </Label>
                <Input
                  {...register('consequence', {
                    validate: {
                      range: (value) =>
                        value === null ||
                        (value >= 0 && value <= 5) ||
                        'Konsekvens skal være mellem 1 og 5',
                    },
                  })}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>Risiko ejer {'->'}</span>
              <SingleDropdown
                selectedValue={undefined}
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
                        (employee) => employee.id === watch('riskOwnerUserId'),
                      )?.email
                    : 'Vælg medarbejder'
                }
                setSelectedValue={(value) => {
                  if (value === watch('riskOwnerUserId')) {
                    setValue('riskOwnerUserId', undefined);
                    return;
                  }
                  setValue('riskOwnerUserId', value);
                }}
              />
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Luk
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="default">
            Opret
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
