'use client';

import { SingleDropdown } from '@components/ui';
import { NextInput } from '@components/ui/Input';
import { useEmployees } from '@lib/api/hooks';
import { type UpdateRiskForm } from '@lib/api/types/risk';
import { RiskStatus, type Project, type Risk, type User } from '@models';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
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
}: EditRiskProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateRiskForm>({
    defaultValues: {
      customId: riskElement.customId ?? '',
      description: riskElement.description ?? '',
      probability: riskElement.probability ?? 0,
      consequence: riskElement.consequence ?? 0,
      status: riskElement.status,
      comment: riskElement.comment ?? '',
    },
  });

  const StatusDropdowOptions: { label: string; value: RiskStatus }[] = [
    {
      label: 'Open',
      value: RiskStatus.Open,
    },
    {
      label: 'Closed',
      value: RiskStatus.Closed,
    },
    {
      label: 'New',
      value: RiskStatus.New,
    },
  ];

  async function onSubmit(data: UpdateRiskForm) {
    try {
      await axios.patch(`/api/risk/${riskElement.id}`, data);
      toast.success('Projektet er opdateret!');
      refetch();
      setRiskBeingEdited(null);
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  const { data: allEmployees, isError } = useEmployees();

  if (isError || !allEmployees) {
    <div>Something went wrong</div>;
  }

  const projectMembers: User[] | undefined = useMemo(() => {
    const projectMemberIds = project.projectUsers.map((pu) => pu.userId);
    return allEmployees?.filter((employee) =>
      projectMemberIds.includes(employee.id),
    );
  }, [allEmployees, project.projectUsers]);

  return (
    <>
      <Modal
        isOpen={!!riskElement}
        onOpenChange={() => setRiskBeingEdited(null)}
        size="4xl"
        placement="top-center"
        backdrop="blur"
        className="bg-[#413e3e]"
        onClose={() => setRiskBeingEdited(null)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-white">
            Rediger Risk
          </ModalHeader>
          <ModalBody className="text-white">
            <div className="flex w-full gap-5">
              <NextInput
                {...register('customId', {
                  required: {
                    value: true,
                    message: 'Id mangler',
                  },
                })}
                value={watch('customId') ?? ''}
                className="w-1/6"
                label="Id"
                labelPlacement="inside"
                errorMessage={errors.customId?.message}
                error={!!errors.customId}
              />
              <NextInput
                {...register('description', {
                  required: {
                    value: true,
                    message: 'Beskrivelse mangler',
                  },
                })}
                value={watch('description') ?? ''}
                label="Beskrivelse"
                className="w-full"
                variant="bordered"
                errorMessage={errors.description?.message}
                error={!!errors.description}
              />
            </div>
            <div className="flex w-full items-center justify-between gap-5">
              <div className="flex w-1/3 gap-4">
                <NextInput
                  {...register('probability', {
                    validate: {
                      range: (value) =>
                        value === undefined ||
                        (value >= 0 && value <= 5) ||
                        'Sandsynlighed skal være mellem 1 og 5',
                    },
                  })}
                  value={watch('probability') ?? ''}
                  label="Sandsynlighed"
                  variant="bordered"
                  type="number"
                  errorMessage={errors.probability?.message}
                  error={!!errors.probability}
                />
                <NextInput
                  {...register('consequence', {
                    validate: {
                      range: (value) =>
                        value === undefined ||
                        (value >= 0 && value <= 5) ||
                        'Konsekvens skal være mellem 1 og 5',
                    },
                  })}
                  value={watch('consequence') ?? ''}
                  label="Konsekvens"
                  variant="bordered"
                  type="number"
                  errorMessage={errors.consequence?.message}
                  error={!!errors.consequence}
                />
              </div>
              <div className="flex items-center gap-14">
                <div className="flex items-center gap-2">
                  <span>Status {'->'}</span>
                  <SingleDropdown
                    options={StatusDropdowOptions}
                    buttonLabel={'Status'}
                    selectedValue={watch('status')}
                    setSelectedValue={(value) => {
                      if (!value) return;
                      setValue('status', value as RiskStatus);
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span>Risiko ejer {'->'}</span>
                  <SingleDropdown
                    selectedValue={undefined}
                    options={
                      projectMembers
                        ? projectMembers.map((employee) => ({
                            label: employee.email,
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
                        : 'Vælg medarbejder'
                    }
                    setSelectedValue={(value) =>
                      value && setValue('riskOwnerUserId', value)
                    }
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => setRiskBeingEdited(null)}>
              Luk
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>Gem</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
