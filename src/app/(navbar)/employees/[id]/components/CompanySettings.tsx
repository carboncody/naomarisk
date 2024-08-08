import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { type UpdateCompanyForm } from '@lib/api/types';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function CompanySettings() {
  const { register, handleSubmit, watch, reset } = useForm<UpdateCompanyForm>();

  async function onSubmit(data: UpdateCompanyForm) {
    try {
      await axios.patch('/api/company', data);
      toast.success('Firmaet er opdateret!');
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

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
              //   {...register('fullName', {
              //     required: {
              //       value: true,
              //       message: 'Name is required',
              //     },
              //   })}
              //   value={watch('fullName') ?? ''}
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
              {...register('email')}
              value={watch('email') ?? ''}
              className="mb-5"
            />
            <Label className="mb-2">Medarbejder ID</Label>
            <Input
              {...register('email')}
              value={watch('email') ?? ''}
              className="mb-5"
            />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Button onClick={handleSubmit(onSubmit)}>Opdater</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
