import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { type UpdateCompanyForm } from '@lib/api/types';
import type { Company } from '@models';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface CompanySettingsProps {
  company: Company;
  refetchMe: () => void;
}

export function CompanySettings({ company, refetchMe }: CompanySettingsProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateCompanyForm>();

  useEffect(() => {
    reset({
      name: company.name,
      cvr: company.cvr,
      email: company.email,
    });
  }, [company, reset]);

  async function onSubmit(data: UpdateCompanyForm) {
    try {
      await axios.patch('/api/company', data);
      refetchMe();
      toast.success('Firmaet er opdateret!');
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  return (
    <>
      <div className="mb-3 flex flex-col gap-1 dark:text-white">
        Firma indstillinger
      </div>
      <div className="dark:text-white">
        <div className=" w-full items-start gap-5">
          <Label className="mb-2">Navn</Label>
          <Input
            {...register('name', {
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
            value={watch('name') ?? ''}
            className="mb-2"
          />
          <Label className="mb-2">CVR nr.</Label>
          <Input
            {...register('cvr')}
            value={watch('cvr') ?? ''}
            className="mb-2"
          />
          <Label className="mb-2">Email</Label>
          <Input
            {...register('email')}
            value={watch('email') ?? ''}
            className="mb-2"
          />
        </div>
        <div className="grid grid-cols-4 gap-5"></div>
      </div>
      <div className="mt-4">
        <Button variant="default" onClick={handleSubmit(onSubmit)}>
          Opdater
        </Button>
      </div>
    </>
  );
}
