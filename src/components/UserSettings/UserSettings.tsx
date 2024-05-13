import { NextInput } from '@components/ui/Input';
import { type UpdateUserForm } from '@lib/api/types';
import { UserRole } from '@models';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface UserSettingsProps {
  refetch: () => void;
}

export default function UserSettings({ refetch }: UserSettingsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserForm>({
    defaultValues: {
      name: '',
      jobDescription: '',
      role: UserRole.User,
      contact: {
        fullName: '',
        phone: '',
        address: '',
      },
    },
  });

  async function onSubmit(data: UpdateUserForm) {
    try {
      await axios.post('/api/user/upsert', {
        UpdateUserForm: data,
      });
      refetch();
      toast.success('Brugeren er opdateret!');
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  return (
    <>
      <div className="mb-3 flex flex-col gap-1 text-white">
        Brugeroplysninger
      </div>
      <div className="text-white">
        <div className=" w-full items-start gap-5">
          <NextInput
            {...register('contact.fullName', {
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
            className="mb-2"
            label="Name"
            labelPlacement="inside"
          />
          <NextInput
            {...register('jobDescription')}
            className="mb-2"
            label="Job title"
            variant="bordered"
          />
          <NextInput
            {...register('contact.phone')}
            className="mb-2"
            label="Telefon nr."
            variant="bordered"
          />
          <NextInput
            {...register('contact.address')}
            label="Adresse"
            variant="bordered"
          />
        </div>
        <div className="grid grid-cols-4 gap-5"></div>
      </div>
      <div className="mt-4">
        <Button onClick={handleSubmit(onSubmit)}>Opdater</Button>
      </div>
    </>
  );
}
