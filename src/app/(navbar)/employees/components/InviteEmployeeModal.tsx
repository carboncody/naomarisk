'use client';

import { SingleDropdown } from '@components/ui';
import { Button } from '@components/ui/button';
import { type CreateUserForm } from '@lib/api/types';
import { UserRole } from '@models';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@components/ui/Input';

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
      fullName: '',
      email: '',
      jobDescription: '',
      role: UserRole.User,
    },
  });

  const RoleActionDropdownOptions: { label: string; value: UserRole }[] = [
    {
      label: 'Bruger',
      value: UserRole.User,
    },
    {
      label: 'Manager',
      value: UserRole.Manager,
    },
    {
      label: 'Ejer',
      value: UserRole.Owner,
    },
  ];

  async function onSubmit(data: CreateUserForm) {
    try {
      await axios.post('/api/user', data);
      refetch();
      toast.success('Brugeren inviteret!');
      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error('Du har ikke rettigheder til invitere brugere');
          return;
        }
        toast.error('Noget gik galt -' + error.code);
        return;
      }
      toast.error('Noget gik galt, beklager.');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Inviter medarbejder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#413e3e]">
        <DialogHeader>
          <DialogTitle className="text-white">
            Inviter medarbejder
          </DialogTitle>
        </DialogHeader>
        <div className="text-white">
          <div className="flex w-full items-start gap-5">
            <Input
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required',
                },
                validate: {
                  email: (value) => {
                    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                    return regex.test(value) || 'Invalid email';
                  },
                },
              })}
              className="bg-Zinc-500 col-span-2"
              // label="Email"
              // errorMessage={errors.email?.message}
              // isInvalid={!!errors.email}
            />
            <Input
              {...register('jobDescription')}
              className="bg-Zinc-500 col-span-2"
              // label="Job beskrivelse"
              // variant="bordered"
            />
          </div>
          <div className="flex h-12 w-1/2 items-center">
            <label className="mx-2">Rolle {'->'}</label>
            <SingleDropdown
              options={RoleActionDropdownOptions}
              buttonLabel={'Roller'}
              selectedValue={watch('role')}
              setSelectedValue={(value) => {
                if (!value) return;
                setValue('role', value as UserRole);
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-5"></div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Luk
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>Opret</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
