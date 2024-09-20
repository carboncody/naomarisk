import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Label } from '@components/ui/label';
import { type UpdateUserForm } from '@lib/api/types';
import { type User } from '@models';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface UserSettingsProps {
  employee: User;
  refetch: () => void;
}

export default function UserSettings({ employee, refetch }: UserSettingsProps) {
  const { register, handleSubmit } = useForm<UpdateUserForm>({
    defaultValues: {
      fullName: employee?.fullName,
      jobDescription: employee?.jobDescription,
      role: employee?.role,
      email: employee?.email,
    },
  });

  async function onSubmit(data: UpdateUserForm) {
    console.info('data: ', data);
    try {
      await axios.patch(`/api/user/${employee.email}`, data);
      refetch();
      toast.success('Brugeren er opdateret');
    } catch (error) {
      toast.error('Noget gik galt, beklager.');
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Kontaktoplysninger</CardTitle>
        </CardHeader>
        <CardContent className="flex w-full flex-col items-start gap-5">
          <div className="w-full space-y-1">
            <Label>Navn</Label>
            <Input
              {...register('fullName', {
                required: {
                  value: true,
                  message: 'Name is required',
                },
              })}
              className="mb-5"
            />
          </div>

          <div className="w-full space-y-1">
            <Label>Funktion</Label>
            <Input {...register('jobDescription')} />
          </div>

          <div className="w-full space-y-1">
            <Label>Email</Label>
            <Input {...register('email', { required: true })} type="email" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="mt-auto" onClick={handleSubmit(onSubmit)}>
            Opdater
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
