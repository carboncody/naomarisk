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

import { useSession } from '@supabase/auth-helpers-react';

export default function NewPreojectDialog() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const session = useSession();

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
      toast('The users email is: ' + session?.user?.email);

      const project = await axios.post('/api/project/create', {
        myEmail: session?.user?.email,
        createProjectForm: data,
      });
      console.info(project);
      reset();
    } catch (error) {
      toast.error("This didn't work.");
      toast('The users email is: ' + session?.user?.email);
      console.error(error);
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        color="primary"
        className="bg-transparent"
        disableAnimation
      >
        Creat a new project
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
                Create a new project
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
                  {/* <NextInput
                    {...register('startDate')}
                    label="Start Date"
                    type="date"
                    variant="bordered"
                  />
                  <NextInput
                    {...register('dueDate')}
                    label="End Date"
                    type="date"
                    variant="bordered"
                  /> */}
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
                  Cancel
                </Button>
                <Button onClick={handleSubmit(onSubmit)}>Save</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
