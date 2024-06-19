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
                    {...register('description', {
                      required: {
                        value: true,
                        message: 'Beskrivelse mangler',
                      },
                    })}
                    label="Beskrivelse"
                    className="w-full"
                    variant="bordered"
                    errorMessage={errors.description?.message}
                    error={!!errors.description}
                  />
                </div>
                <div className="flex w-full gap-5">
                  <div className="w-full">
                    <NextInput
                      {...register('activity', {
                        required: {
                          value: false,
                          message: 'aktivitet mangler',
                        },
                      })}
                      label="Aktivitet"
                      className="w-full"
                      variant="bordered"
                      errorMessage={errors.activity?.message}
                      error={!!errors.activity}
                    />
                  </div>
                  <div className="w-full">
                    <NextInput
                      {...register('comment', {
                        required: {
                          value: false,
                          message: 'Kommentar mangler',
                        },
                      })}
                      label="Kommentar"
                      className="w-full"
                      variant="bordered"
                      errorMessage={errors.comment?.message}
                      error={!!errors.comment}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between gap-5">
                  <div className="flex w-1/3 gap-4">
                    <NextInput
                      {...register('probability', {
                        validate: {
                          range: (value) =>
                            value === null ||
                            (value >= 0 && value <= 5) ||
                            'Sandsynlighed skal være mellem 1 og 5',
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
                        validate: {
                          range: (value) =>
                            value === null ||
                            (value >= 0 && value <= 5) ||
                            'Konsekvens skal være mellem 1 og 5',
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
