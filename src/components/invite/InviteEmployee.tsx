'use client';

import { SingleDropdown } from '@components/ui';
import { NextInput } from '@components/ui/Input';
import { type CreateUserForm } from '@lib/api/types';
import { UserRole } from '@models';
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

interface InviteEmployeeProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function InviteEmployee({
  isOpen,
  setIsOpen,
  refetch,
}: InviteEmployeeProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateUserForm>({
    defaultValues: {
      name: '',
      email: '',
      jobDescription: '',
      role: UserRole.User,
    },
  });

  const RoleActionDropdownOptions = [
    {
      label: 'Bruger',
      value: 'USER',
    },
    {
      label: 'Manager',
      value: 'MANAGER',
    },
    {
      label: 'Ejer',
      value: 'OWNER',
    },
  ];
  async function onSubmit(data: CreateUserForm) {
    try {
      await axios.post('/api/user/create', {
        CreateUserForm: data,
      });
      refetch();
      toast.success('Brugeren inviteret!');
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
                Inviter medarbejder
              </ModalHeader>
              <ModalBody className="text-white">
                <div className="flex w-full items-start gap-5">
                  <NextInput
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                      validate: {
                        email: (value) => {
                          const regex =
                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                          return regex.test(value) || 'Invalid email';
                        },
                      },
                    })}
                    className="col-span-2"
                    label="Email"
                    labelPlacement="inside"
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors.email}
                  />
                  <NextInput
                    {...register('jobDescription')}
                    label="Job title"
                    variant="bordered"
                  />
                </div>
                <div className="flex h-12 w-1/2 items-center">
                  <label className="mx-2">Rolle {'->'}</label>
                  <SingleDropdown
                    options={RoleActionDropdownOptions}
                    buttonLabel={'Roller'}
                    selectedValue={watch('role')}
                    setSelectedValue={(value) => {
                      setValue('role', value as UserRole);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 gap-5"></div>
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
