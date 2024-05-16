'use client';

import { NextInput } from '@components/ui/Input';
import { UpdateProjectForm } from '@lib/api/types';
import { Project } from '@models';
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
  // refetch: () => void;
}

export default function EditProject({
  isOpen,
  setIsOpen,
  project,
  // refetch,
}: EditProjectProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProjectForm>({
    defaultValues: {
      ...project,
      riskIds: project.risks?.map((risk) => ({ id: risk.id })) ?? [],
      projectUserIds: project.projectUsers.map((pu) => ({ userId: pu.userId })),
    },
  });

  async function onSubmit(data: UpdateProjectForm) {
    try {
      await axios.post(`/api/project/${project.id}`, {
        UpdateProjectForm: data,
      });
      // refetch();
      toast.success('Projektet er opdateret!');
      setIsOpen(false);
    } catch (error) {
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
