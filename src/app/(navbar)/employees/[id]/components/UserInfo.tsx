import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
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
      <Card>
        <CardHeader>
          <CardTitle>Kontaktoplysninger</CardTitle>
        </CardHeader>
        <CardContent>
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
              className="mb-5"
            />

            <Label className="mb-2">Job beskrivelse</Label>
            <Input
              {...register('jobDescription')}
              value={watch('jobDescription') ?? ''}
              className="mb-5"
            />
            <Label className="mb-2">Arbejdstelefon</Label>
            <Input
            //   {...register('contact')}
            //   value={watch('contact') ?? ''}
              className="mb-5"
            />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Button onClick={handleSubmit(onSubmit)}>Opdater</Button>
            <div></div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
