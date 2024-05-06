import { NextInput } from '@components/ui/Input';
import { UpdateUserForm } from '@lib/api/types';
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
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateUserForm>({
    defaultValues: {
      name: '',
      jobDescription: '',
      role: UserRole.User,
    },
  });

  //   const RoleActionDropdownOptions = [
  //     {
  //       label: 'Bruger',
  //       value: 'USER',
  //     },
  //     {
  //       label: 'Manager',
  //       value: 'MANAGER',
  //     },
  //     {
  //       label: 'Ejer',
  //       value: 'OWNER',
  //     },
  //   ];

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
        Ændre brugerindstillinger
      </div>
      <div className="text-white">
        <div className=" w-full items-start gap-5">
          <NextInput
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
            className="col-span-2 mb-2"
            label="Name"
            labelPlacement="inside"
          />
          <NextInput
            {...register('jobDescription')}
            label="Job title"
            variant="bordered"
          />
        </div>
        {/* <div className="mt-3 flex h-12 w-1/2 items-center">
          <label className="mx-2">Rolle {'->'}</label>
          <SingleDropdown
            options={RoleActionDropdownOptions}
            buttonLabel={'Roller'}
            selectedValue={watch('role')}
            setSelectedValue={(value) => {
              setValue('role', value as UserRole);
            }}
          />
        </div> */}
        <div className="grid grid-cols-4 gap-5"></div>
      </div>
      <div className="mt-4">
        <Button onClick={handleSubmit(onSubmit)}>Opdater</Button>
      </div>
    </>
  );
}
