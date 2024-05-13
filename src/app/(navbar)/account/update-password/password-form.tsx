'use client';
import Alert from '@components/ui/Alert';
import InputErrorMessage from '@components/ui/InputErrorMessage';
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
    <div className="flex min-h-screen flex-col items-center justify-center text-white">
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
          <label htmlFor="password" className="label">
            Password
          </label>
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
        <div className="form-control mt-5">
          <label htmlFor="passwordConfirm" className="label">
            Confirm Password
          </label>
          <Input
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
          <button className="btn btn-primary rounded-xl border bg-white px-2 py-2 text-black">
            Update Password
          </button>
        </div>
      </form>
      <div className="item-center justify-flex my-4 flex justify-center">
        <Link href="/account">
          <Button>Tilbage</Button>
        </Link>
      </div>
    </div>
  );
}
