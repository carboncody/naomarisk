import { NextInput } from '@components/ui/Input';
import { type UpdateUserForm } from '@lib/api/types';
import { type User } from '@models';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface UserSettingsProps {
  me: User;
  refetchMe: () => void;
}

export default function UserSettings({ me, refetchMe }: UserSettingsProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateUserForm>();

  useEffect(() => {
    reset(me);
  }, [me, reset]);

  async function onSubmit(data: UpdateUserForm) {
    try {
      console.info(data);
      await axios.patch<User>('/api/user', data);
      refetchMe();
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
            {...register('fullName', {
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
            value={watch('fullName') ?? ''}
            className="mb-2"
            label="Name"
            labelPlacement="inside"
            isInvalid={!!errors.fullName}
            errorMessage={errors.fullName?.message}
          />
          <NextInput
            {...register('jobDescription')}
            value={watch('jobDescription') ?? ''}
            className="mb-2"
            label="Job beskrivelse"
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
