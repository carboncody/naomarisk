'use client';

import { DatePicker } from '@components/ui/DatePicker';
import { NextInput } from '@components/ui/Input';
import { type UpdateProjectForm } from '@lib/api/types';
import { type Project } from '@models';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditProjectProps {
  isOpen: boolean;
  project: Project;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function EditProject({
  isOpen,
  setIsOpen,
  project,
  refetch,
}: EditProjectProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProjectForm>({
    defaultValues: {
      name: project.name ?? '',
      startDate: project.startDate ?? new Date(),
      dueDate: project.dueDate ?? undefined,
      budget: project.budget ?? '0',
      description: project.description ?? '',
    },
  });

  async function onSubmit(data: UpdateProjectForm) {
    try {
      await axios.patch(`/api/project/${project.id}`, data);
      toast.success('Projektet er opdateret!');
      refetch();
      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error('Du har ikke rettigheder til at oprette projekter');
          return;
        }
        toast.error('Noget gik galt -' + error.code);
        return;
      }
      toast.error('Noget gik galt, beklager.');
    }
  }

  console.info(watch());

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
                Rediger Projekt
              </ModalHeader>
              <ModalBody className="text-white">
                <div className="flex w-full items-start gap-5">
                  <NextInput
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Navn er påkrævet',
                      },
                      minLength: {
                        value: 3,
                        message: 'Navn skal være mindst 3 tegn',
                      },
                    })}
                    value={watch('name') ?? ''}
                    label="Projektnavn"
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                  <NextInput
                    {...register('description')}
                    value={watch('description') ?? ''}
                    label="Beskrivelse"
                    variant="bordered"
                  />
                </div>
                <div className="flex gap-5">
                  <div className="flex flex-col">
                    <DatePicker
                      customPlaceholder="Vælg start dato"
                      date={watch('startDate') ?? null}
                      setDate={(date: Date | null) => {
                        setValue('startDate', date);
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <DatePicker
                      customPlaceholder="Vælg slut dato"
                      date={watch('dueDate') ?? null}
                      setDate={(date: Date | null) => {
                        setValue('dueDate', date);
                      }}
                    />
                  </div>

                  <NextInput
                    {...register('budget')}
                    value={watch('budget') ?? ''}
                    label="Budget [kr.]"
                    variant="bordered"
                    type="number"
                  />
                </div>
                <div className="grid grid-cols-4 gap-5"></div>
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
    </>
  );
}
