'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SingleDropdown } from '@components/ui';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { type UpdateUserForm } from '@lib/api/types';
import { UserRole, type User } from '@models';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditEmployeeModalProps {
  isOpen: boolean;
  employee: User;
  setEmployeeBeingEdited: (employee: User | null) => void;
  refetch: () => void;
}

export default function EditEmployeeModal({
  refetch,
  setEmployeeBeingEdited,
  employee,
}: EditEmployeeModalProps) {
  const { register, handleSubmit, setValue, watch } = useForm<UpdateUserForm>({
    defaultValues: {
      fullName: employee.fullName,
      jobDescription: employee.jobDescription,
      role: employee.role,
    },
  });

  async function onSubmit(data: UpdateUserForm) {
    console.info('data: ', data);
    try {
      await axios.patch(`/api/user/${employee.email}`, data);
      refetch();
      toast.success('Brugeren er opdateret');
      setEmployeeBeingEdited(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error('Du har ikke rettigheder til at redigere brugere');
          return;
        }
        toast.error('Noget gik galt -' + error.code);
        return;
      }
      toast.error('Noget gik galt, beklager.');
    }
  }

  async function onDelete() {
    try {
      await axios.delete(`/api/user/${employee.email}`);
      refetch();
      toast.success('Brugeren er slettet');
      setEmployeeBeingEdited(null);
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

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

  return (
    <Dialog open={!!employee} onOpenChange={() => setEmployeeBeingEdited(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold dark:text-white">
            <span className="text-red-500">Slet </span>/ Rediger medarbejder!
          </DialogTitle>
        </DialogHeader>
        <div className="dark:text-white">
          <div className="flex w-full items-start gap-5">
            <div className="w-full">
              <Label className="mb-2">Navn</Label>
              <Input {...register('fullName', {})} value={watch('fullName')} />
            </div>
            <div className="w-full">
              <Label className="mb-2">Jobbeskrivelse</Label>
              <Input
                {...register('jobDescription')}
                value={watch('jobDescription')}
              />
            </div>
          </div>
          <div className="mt-5 flex h-12 w-1/2 items-center">
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
          <Button variant="destructive" onClick={handleSubmit(onDelete)}>
            Slet Medarbejder
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => setEmployeeBeingEdited(null)}
            >
              Fortryd
            </Button>
            <Button
              variant="default"
              className="bg-[#616161] text-white"
              onClick={handleSubmit(onSubmit)}
            >
              Gem ændringer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
