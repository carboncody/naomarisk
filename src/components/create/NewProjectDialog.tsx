'use client';

import { NextInput } from '@components/ui/Input';
import { type CreateProjectForm } from '@lib/api/types';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function NewProjectDialog() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    defaultValues: {
      name: '',
      description: '',
      startDate: new Date(),
      dueDate: undefined,
    },
  });

  async function onSubmit(data: CreateProjectForm) {
    try {
      const project = await axios.post('/api/project/create', {
        createProjectForm: data,
      });
      console.info('The Project is:', project);
      toast.success('Project created');
      reset();
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        color="primary"
        className="text-md bg-transparent"
        disableAnimation
      >
        Opret nyt projekt
      </Button>

      <Modal
        className="bg-[#413e3e]"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Opret nyt projekt
              </ModalHeader>
              <ModalBody className="text-white">
                <div className="grid grid-cols-2 gap-5">
                  <NextInput
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Project name is required',
                      },
                    })}
                    autoFocus
                    label="Project name"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                  <NextInput
                    {...register('description')}
                    label="Project Description"
                    variant="bordered"
                  />
                </div>
                <div className="grid grid-cols-4 gap-5">
                  <NextInput
                    {...register('budget')}
                    className="col-span-2"
                    label="Budget [kr.]"
                    type="number"
                    labelPlacement="inside"
                  />
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
