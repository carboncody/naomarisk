'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SingleDropdown } from '@components/ui';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { type CreateUserForm } from '@lib/api/types';
import { UserRole } from '@models';
import axios, { AxiosError } from 'axios';
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
      <DialogContent className="bg-zinc-200 dark:bg-zinc-700">
        <DialogHeader>
          <DialogTitle className="dark:text-white">
            Inviter medarbejder
          </DialogTitle>
        </DialogHeader>
        <div className="dark:text-white">
          <div className="flex w-full items-start gap-5">
            <div className="w-1/2">
              <Label className="dark:text-white">Email</Label>
              <Input
                className="mt-1"
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
              />
            </div>
            <div className="w-1/2">
              <Label className="dark:text-white">Job beskrivelse</Label>
              <Input className="mt-1" {...register('jobDescription')} />
            </div>
          </div>
          <div className="mt-3 flex h-12 w-1/2 items-center">
            <label className=" dark:text-white">Rolle {'->'}</label>
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
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Luk
          </Button>
          <Button variant="default" onClick={handleSubmit(onSubmit)}>
            Opret
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
