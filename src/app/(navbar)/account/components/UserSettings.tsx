import { Input } from '@components/ui/Input';
import { ThemeSwitcher } from '@components/ui/abstractions/buttons/ThemeSwitcher';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { type UpdateUserForm } from '@lib/api/types';
import { type User } from '@models';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface UserSettingsProps {
  me: User;
  refetchMe: () => void;
}

export default function UserSettings({ me, refetchMe }: UserSettingsProps) {
  const { register, handleSubmit, watch, reset } = useForm<UpdateUserForm>();

  useEffect(() => {
    reset({
      fullName: me.fullName,
      jobDescription: me.jobDescription,
      email: me.email,
      role: me.role,
      company: me.companyId,
    });
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
      <div className="mb-3 flex flex-col gap-1 dark:text-white">
        Brugeroplysninger
      </div>
      <div className="dark:text-white">
        <div className=" w-full items-start gap-5">
          <Label className="mb-2">Navn</Label>
          <Input
            {...register('fullName', {
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
            value={watch('fullName') ?? ''}
            className="mb-2"
          />

          <Label className="mb-2">Job beskrivelse</Label>
          <Input
            {...register('jobDescription')}
            value={watch('jobDescription') ?? ''}
            className="mb-2"
          />
        </div>
        <div className="grid grid-cols-4 gap-5"></div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <Button onClick={handleSubmit(onSubmit)}>Opdater</Button>
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
}
