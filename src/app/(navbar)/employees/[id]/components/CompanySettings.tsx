import { Input } from '@components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { type UpdateUserForm } from '@lib/api/types';
import { type User } from '@models';
import { useForm } from 'react-hook-form';

interface CompanySettingsProps {
  employee: User;
  refetch: () => void;
}

export default function CompanySettings({ employee }: CompanySettingsProps) {
  const {} = useForm<UpdateUserForm>({
    defaultValues: {
      fullName: employee?.fullName,
      jobDescription: employee?.jobDescription,
      role: employee?.role,
      email: employee?.email,
      // cvr: employee?.company.cvr
    },
  });

  // async function onSubmit(data: UpdateUserForm) {
  //   console.info('data: ', data);
  //   try {
  //     await axios.patch(`/api/user/${employee.email}`, data);
  //     refetch();
  //     toast.success('Brugeren er opdateret');
  //   } catch (error) {
  //     toast.error('Noget gik galt, beklager.');
  //   }
  // }

  return (
    <>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Firmaoplysnigner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" w-full items-start gap-5">
            <Label className="mb-2">Firmanavn</Label>
            <Input
              // {...register('jobDescription')}
              className="mb-5"
            />
            <Label className="mb-2">CVR Nr.</Label>
            <Input
              //   {...register('jobDescription')}
              //   value={watch('jobDescription') ?? ''}
              className="mb-5"
            />
            <Label className="mb-2">Afdeling</Label>
            <Input
              // {...register('email')}
              // value={watch('email') ?? ''}
              className="mb-5"
            />
            <Label className="mb-2">Medarbejder ID</Label>
            <Input
              // {...register('email')}
              // value={watch('email') ?? ''}
              className="mb-5"
            />
          </div>
          <div className="mt-4 flex items-center gap-4">
            {/* <Button onClick={handleSubmit(onSubmit)}>Opdater</Button> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
