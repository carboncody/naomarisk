import { Table } from '@components/Table';
import { sortBy } from '@components/Table/sorting/sort.utils';
import { type TableColumns } from '@components/Table/types/table.columns';
import { NextInput, SingleDropdown } from '@components/ui';
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
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface RiskTableProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
  risks: Risk[];
  project: Project;
}

export default function RiskTable({
  risks,
  isOpen,
  setIsOpen,
  refetch,
  project,
}: RiskTableProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<UpdateRiskForm>();

  const [riskBeingEdited, setRiskBeingEdited] = useState<Risk | null>(null);

  useEffect(() => {
    if (riskBeingEdited) {
      reset({
        customId: riskBeingEdited.customId ?? '',
        description: riskBeingEdited.description ?? '',
        probability: riskBeingEdited.probability ?? 0,
        consequence: riskBeingEdited.consequence ?? 0,
        status: riskBeingEdited.status,
        comment: riskBeingEdited.comment ?? '',
      });
    }
  }, [riskBeingEdited, reset]);

  async function onSubmit(data: UpdateRiskForm) {
    try {
      await axios.patch(`/api/risk/${project.id}`, data);
      toast.success('Risk er opdateret!');
      refetch();
      setIsOpen(false);
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  const rows: Risk[] = risks;
  // const [riskBeingEdited, setRiskBeingEdited] = useState<Risk | null>(null);

  const columns: TableColumns<Risk> = {
    id: {
      title: 'Risk-ID',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span>{risk.customId}</span>
          <br />
          <span className="break-words text-gray-400">
            Status: {risk.status}
          </span>
        </div>
      ),
      sort: sortBy('string'),
    },
    description: {
      title: 'Beskrivelse',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span className="break-words text-gray-400">{risk.description}</span>
        </div>
      ),
    },

    probability: {
      title: 'Risiko',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span className="break-words text-gray-400">
            Sansynlighed: {risk.probability}
          </span>
          <br />
          <span className="break-words text-gray-400">
            Konsekvens: {risk.consequence}
          </span>
        </div>
      ),
    },
    riskowner: {
      title: 'Ejer',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span className="break-words text-gray-400">
            {risk.riskowner.email}
          </span>
        </div>
      ),
    },
  };

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

  const StatusDropdowOptions: { label: string; value: RiskStatus }[] = [
    {
      label: 'Open',
      value: RiskStatus.Open,
    },
    {
      label: 'closed',
      value: RiskStatus.Closed,
    },
    {
      label: 'new',
      value: RiskStatus.New,
    },
  ];

  return (
    <>
      <Table
        onRowClick={(risk) => setRiskBeingEdited(risk)}
        columns={columns}
        rows={rows}
      />

      {riskBeingEdited && (
        <Modal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          size="4xl"
          placement="top-center"
          backdrop="blur"
          className="bg-[#413e3e]"
          onClose={() => setIsOpen(false)}
        >
          <ModalContent>
            {(onClose) => (
              <>
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
                      {...register('description')}
                      value={watch('description') ?? ''}
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
                              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                              (value && value >= 0 && value <= 10) ||
                              'Sandsynlighed skal være mellem 0 og 10',
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
                          required: {
                            value: true,
                            message: 'Konsekvens mangler',
                          },
                          validate: {
                            range: (value) =>
                              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                              (value && value >= 0 && value <= 10) ||
                              'Konsekvens skal være mellem 0 og 10',
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
                  <Button color="danger" onClick={onClose}>
                    Luk
                  </Button>
                  <Button onClick={handleSubmit(onSubmit)}>Gem</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
