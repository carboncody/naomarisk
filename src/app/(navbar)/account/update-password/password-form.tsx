'use client';
import Alert from '@components/ui/Alert';
import { Input } from '@components/ui/Input';
import InputErrorMessage from '@components/ui/InputErrorMessage';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { formatError } from '@lib/services/supabase/utils';
import { UpdatePasswordSchema } from '@lib/services/supabase/validationSchema';
import {
  createClientComponentClient,
  type User,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ZodError, type z } from 'zod';

type FormData = z.infer<typeof UpdatePasswordSchema>;

export default function PasswordForm({ user }: { user: User | undefined }) {
  const supabase = createClientComponentClient();
  const [errors, setErrors] = useState<FormData>();
  const [message, setMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    password: '',
    passwordConfirm: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormSuccess(false);
    setErrors(undefined);
    setMessage('');

    const password = formData.password;
    const passwordConfirm = formData.passwordConfirm;

    try {
      UpdatePasswordSchema.parse({ password, passwordConfirm });
    } catch (err) {
      if (err instanceof ZodError) {
        const errs = formatError(err) as FormData;
        setErrors(errs);
        return;
      }
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
      return;
    }

    setFormData({ password: '', passwordConfirm: '' });
    setFormSuccess(true);
    setMessage('Din adgangskode blev opdateret.');
  };
  return (
    <div className="flex items-center justify-center ">
      <div className="mt-10 flex w-full max-w-md flex-col rounded-lg border p-5 dark:border-transparent dark:bg-zinc-900">
        {message ? (
          <Alert
            className={`${formSuccess ? 'alert-info' : 'alert-error'} mb-10`}
          >
            {message}
          </Alert>
        ) : null}
        <h2 className="mb-4 text-4xl  font-semibold text-black dark:text-white">
          Opdater kode
        </h2>
        <p className="mb-4 font-medium text-black dark:text-white">
          Hi {user?.email}, Indtast din nye kode nedenfor og bekræft den
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <Label htmlFor="password" className="label mb-2">
              Kode
            </Label>
            <Input
              id="Kode"
              name="password"
              type="password"
              value={formData?.password ?? ''}
              onChange={(ev) =>
                setFormData({ ...formData, password: ev.target.value })
              }
              className="input input-bordered"
            />
          </div>
          {errors?.password ? (
            <InputErrorMessage>{errors?.password}</InputErrorMessage>
          ) : null}
          <div className="form-control mt-5">
            <Label htmlFor="passwordConfirm" className="label mb-2">
              Bekræft Kode
            </Label>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={formData.passwordConfirm ?? ''}
              onChange={(ev) =>
                setFormData({ ...formData, passwordConfirm: ev.target.value })
              }
            />
          </div>
          {errors?.passwordConfirm ? (
            <InputErrorMessage>{errors?.passwordConfirm}</InputErrorMessage>
          ) : null}
          <div className="form-control mt-6 justify-center text-center">
            <Button>Opdater Kode</Button>
          </div>
        </form>
        <div className="item-center justify-flex my-4 flex justify-center">
          <Link href="/account">
            <Button>Tilbage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
