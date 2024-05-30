import { NextInput } from '@components/ui/Input';
import { type UpdateCompanyForm } from '@lib/api/types';
import type { Company } from '@models';
import { Button } from '@nextui-org/react';
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
      <div className="mb-3 flex flex-col gap-1 text-white">
        Firma indstillinger
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
            value={watch('name') ?? ''}
            className="mb-2"
            label="Navn"
            labelPlacement="inside"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <NextInput
            {...register('cvr')}
            value={watch('cvr') ?? ''}
            className="mb-2"
            label="CVR nr."
            variant="bordered"
          />
          <NextInput
            {...register('email')}
            value={watch('email') ?? ''}
            className="mb-2"
            label="Email"
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
