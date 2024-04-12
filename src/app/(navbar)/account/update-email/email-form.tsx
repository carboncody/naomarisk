'use client';
import Alert from '@/components/Alert';
import InputErrorMessage from '@/components/InputErrorMessage';
import { formatError } from '@/lib/utils';
import { UpdateEmailSchema } from '@/lib/validationSchema';
import { Button, Input } from '@nextui-org/react';
import {
  createClientComponentClient,
  type User,
} from '@supabase/auth-helpers-nextjs';
import { useState, type FormEvent } from 'react';
import { ZodError, type z } from 'zod';

type FormData = z.infer<typeof UpdateEmailSchema>;

export default function EmailForm({ user }: { user: User | undefined }) {
  const supabase = createClientComponentClient();
  const [errors, setErrors] = useState<FormData>();
  const [message, setMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    emailConfirm: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormSuccess(false);
    setErrors(undefined);
    setMessage('');

    const email = formData.email;
    const emailConfirm = formData.emailConfirm;

    try {
      UpdateEmailSchema.parse({ email, emailConfirm });
    } catch (err) {
      if (err instanceof ZodError) {
        const errs = formatError(err) as FormData;
        setErrors(errs);
        return;
      }
    }

    const { error } = await supabase.auth.updateUser({ email });

    if (error) {
      setMessage(error.message);
      return;
    }

    // reset form
    setFormData({ email: '', emailConfirm: '' });
    setFormSuccess(true);
    setMessage('Your email was updated successfully.');
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
      <h2 className="mb-4 text-4xl font-semibold">Update Email</h2>
      <p className="mb-4 font-medium">
        Hi {user?.email}, Enter your new email below and confirm it
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <Input
            label="Email"
            placeholder="Enter a new email"
            id="email"
            name="email"
            type="email"
            value={formData?.email ?? ''}
            onChange={(ev) =>
              setFormData({ ...formData, email: ev.target.value })
            }
            className="input input-bordered"
          />
        </div>
        {errors?.email ? (
          <InputErrorMessage>{errors?.email}</InputErrorMessage>
        ) : null}
        <div className="form-control">
          <label htmlFor="emailConfirm" className="label">
            Confirm Email
          </label>
          <Input
            id="emailConfirm"
            name="emailConfirm"
            type="email"
            value={formData.emailConfirm ?? ''}
            onChange={(ev) =>
              setFormData({ ...formData, emailConfirm: ev.target.value })
            }
            className="input input-bordered"
          />
        </div>
        {errors?.emailConfirm ? (
          <InputErrorMessage>{errors?.emailConfirm}</InputErrorMessage>
        ) : null}
        <div className="form-control mt-6 justify-center text-center">
          <Button className="btn btn-primary no-animation">Update Email</Button>
        </div>
      </form>
    </div>
  );
}
