'use client';

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
import axios from 'axios';
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
    // setValue,
    // watch,
    // formState: { errors },
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
    console.log('save button pressed');
    console.log('Data received:', data);

    try {
      await axios.patch(`/api/project/${project.id}`, data);
      toast.success('Projektet er opdateret!');
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Error - something went wrong');
    }
  }

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
                    {...register('name')}
                    label="Projektnavn"
                    variant="bordered"
                  />
                  <NextInput
                    {...register('description')}
                    label="Beskrivelse"
                    variant="bordered"
                  />
                </div>
                <div className="flex gap-5">
                  <NextInput
                    {...register('startDate')}
                    label="Start dato"
                    variant="bordered"
                  />
                  <NextInput
                    {...register('dueDate')}
                    label="Slut dato"
                    variant="bordered"
                  />
                  <NextInput
                    {...register('budget')}
                    label="Budget"
                    variant="bordered"
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
