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
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function NewProjectDialog() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const session = useSession();

  const supabase = createClient(
    'https://mjqqjcubkoilxmelnbxn.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qcXFqY3Via29pbHhtZWxuYnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NTMyNzAsImV4cCI6MjAyODIyOTI3MH0.eFYDUktj6m3vDznvDJosUNSQOAO-wQCf_MS6WM6MGKM',
  );

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
        // myEmail: session?.user?.email,
        createProjectForm: data,
      });
      console.info(project);
      reset();
    } catch (error) {
      toast.error("This didn't work.");
      // toast('The users email is: ' + session?.user?.email);
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
        Create a new project
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
