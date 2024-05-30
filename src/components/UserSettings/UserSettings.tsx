import { NextInput } from '@components/ui/Input';
import LoadingSpinner from '@components/ui/LoadSpinner';
import { useMe } from '@lib/api/hooks/users/useMe';
import { type UpdateUserForm } from '@lib/api/types';
import { type User } from '@models';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import Error from 'next/error';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function UserSettings() {
  const { data: me, isLoading, error } = useMe();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateUserForm>();

  async function onSubmit(data: UpdateUserForm) {
    try {
      const updatedMe = await axios.patch<User>('/api/user', data);
      reset({
        fullName: updatedMe.data.fullName,
        jobDescription: updatedMe.data.jobDescription,
      });
      toast.success('Brugeren er opdateret!');
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  useEffect(() => {
    if (me) {
      reset({
        fullName: me.fullName,
        jobDescription: me.jobDescription,
      });
    }
  }, [me, reset]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Error statusCode={500} title="Something went wrong" />;
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
            label="Job title"
            variant="bordered"
          />
          {/* <NextInput
            {...register('contact.phone')}
            className="mb-2"
            label="Telefon nr."
            variant="bordered"
          />
          <NextInput
            {...register('contact.address')}
            label="Adresse"
            variant="bordered"
          /> */}
        </div>
        <div className="grid grid-cols-4 gap-5"></div>
      </div>
      <div className="mt-4">
        <Button onClick={handleSubmit(onSubmit)}>Opdater</Button>
      </div>
    </>
  );
}
