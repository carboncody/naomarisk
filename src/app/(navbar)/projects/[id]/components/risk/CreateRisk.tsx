'use client';

import { SingleDropdown } from '@components/ui';
import { NextInput } from '@components/ui/Input';
import { useEmployees } from '@lib/api/hooks';
import { type CreateRiskForm } from '@lib/api/types/risk';
import type { Project, User } from '@models';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
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
      status: 'NEW',
    },
  });

  async function onSubmit(data: CreateRiskForm) {
    if (data.riskOwnerUserId === undefined) {
      toast.error('Du skal vælge en medarbejder');
      return;
    }

    try {
      await axios.post('/api/risk/' + project.id, data);
      refetch();
      toast.success('Risk oprettet!');
      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.error(
          'Risk already exists with the Id - ' +
            data.customId +
            ' in project ' +
            project.name,
        );
        return;
      }
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
        className="bg-[#413e3e]"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="top-center"
        backdrop="blur"
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Opret Risiko
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
                    className="w-1/6"
                    label="Id"
                    labelPlacement="inside"
                    errorMessage={errors.customId?.message}
                    error={!!errors.customId}
                  />
                  <NextInput
                    {...register('description')}
                    label="Beskrivelse"
                    className="w-full"
                    variant="bordered"
                  />
                </div>
                <div className="flex w-full items-center justify-between gap-5">
                  <div className="flex w-1/3 gap-4">
                    <NextInput
                      {...register('probability', {
                        required: {
                          value: true,
                          message: 'Sandsynlighed mangler',
                        },
                        validate: {
                          range: (value) =>
                            (value >= 0 && value <= 10) ||
                            'Sandsynlighed skal være mellem 0 og 10',
                        },
                      })}
                      label="Sandsynlighed"
                      variant="bordered"
                      type="number"
                      errorMessage={errors.probability?.message}
                      error={!!errors.probability}
                    />

                    <NextInput
                      {...register('consequence', {
                        required: {
                          value: true,
                          message: 'Konsekvens mangler',
                        },
                        validate: {
                          range: (value) =>
                            (value >= 0 && value <= 10) ||
                            'Konsekvens skal være mellem 0 og 10',
                        },
                      })}
                      label="Konsekvens"
                      variant="bordered"
                      type="number"
                      errorMessage={errors.consequence?.message}
                      error={!!errors.consequence}
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Luk
                </Button>
                <Button onClick={handleSubmit(onSubmit)}>Opret</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
