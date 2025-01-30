import { Input } from '@components/ui/Input';
import { ThemeSwitcher } from '@components/ui/abstractions/buttons/ThemeSwitcher';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { type UpdateUserForm } from '@lib/api/types';
import { type User } from '@models';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ProfilePictureUploader from './Avatar';

interface UserSettingsProps {
  me: User;
  refetchMe: () => void;
}

export default function UserSettings({ me, refetchMe }: UserSettingsProps) {
  const { register, handleSubmit, watch, reset } = useForm<UpdateUserForm>();
  const [profileImage, setProfileImage] = useState(me.avatarUrl ?? '');

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
      await axios.patch<User>('/api/user', {
        ...data,
        avatar_url: profileImage,
      });
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

      {/* Profile Picture Upload Section */}
      <div className="flex flex-col items-center gap-4">
        {profileImage ? (
          <Image
            src={profileImage}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-200"></div>
        )}
        <ProfilePictureUploader user={me} onUpload={setProfileImage} />
      </div>

      <div className="mt-6 dark:text-white">
        <div className="w-full items-start gap-5">
          <Label className="mb-2">Navn</Label>
          <Input
            {...register('fullName', {
              required: { value: true, message: 'Name is required' },
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
