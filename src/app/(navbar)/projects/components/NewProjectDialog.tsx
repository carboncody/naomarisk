'use client';

import { DatePicker } from '@components/ui/DatePicker';
import { NextInput } from '@components/ui/Input';
import { type CreateProjectForm } from '@lib/api/types';
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

interface NewProjectDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function NewProjectDialog({
  isOpen,
  setIsOpen,
  refetch,
}: NewProjectDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
      console.log(data);
      await axios.post('/api/project/create', data);
      toast.success('Project created!');
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
                Opret nyt projekt
              </ModalHeader>
              <ModalBody className="text-white">
                <div className="flex gap-3">
                  <NextInput
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Project name is required',
                      },
                    })}
                    label="Project name"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                  <NextInput
                    {...register('description')}
                    label="Project Description"
                    variant="bordered"
                  />
                  <NextInput
                    {...register('budget')}
                    className="col-span-2"
                    label="Budget [kr.]"
                    type="number"
                  />
                </div>
                <div className="flex gap-5">
                  <DatePicker
                    customPlaceholder="Vælg start dato"
                    date={watch('startDate') ?? null}
                    setDate={(date: Date | null) => {
                      setValue('startDate', date);
                    }}
                  />
                  <DatePicker
                    customPlaceholder="Vælg slut dato"
                    date={watch('dueDate') ?? null}
                    setDate={(date: Date | null) => {
                      setValue('dueDate', date);
                    }}
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
