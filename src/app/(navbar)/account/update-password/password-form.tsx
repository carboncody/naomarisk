'use client';
import Alert from '@/components/Alert';
import InputErrorMessage from '@/components/InputErrorMessage';
import { formatError } from '@lib/services/supabase/utils';
import { UpdatePasswordSchema } from '@lib/services/supabase/validationSchema';
import { Button, Input } from '@nextui-org/react';
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

    // reset form
    setFormData({ password: '', passwordConfirm: '' });
    setFormSuccess(true);
    setMessage('Your password was updated successfully.');
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b  from-[#1c1c1c] to-[#2a2929] text-white">
      {message ? (
        <Alert
          className={`${formSuccess ? 'alert-info' : 'alert-error'} mb-10`}
        >
          {message}
        </Alert>
      ) : null}
      <h2 className="mb-4 text-4xl font-semibold">Update Password</h2>
      <p className="mb-4 font-medium">
        Hi {user?.email}, Enter your new password below and confirm it
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <Input
            id="password"
            label="Enter a new password"
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
        <div className="form-control">
          <Input
            className="my-5"
            id="passwordConfirm"
            name="passwordConfirm"
            label="Confirm password"
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
          <Button className="btn btn-primary no-animation">
            Update Password
          </Button>
        </div>
        <div className=" justify-flex flex justify-center">
          <Link className="block w-full p-3" href="/account">
            <Button>Back</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
