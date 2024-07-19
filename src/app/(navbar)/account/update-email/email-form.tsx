'use client';
import Alert from '@components/ui/Alert';
import { Input } from '@components/ui/Input';
import InputErrorMessage from '@components/ui/InputErrorMessage';
import { Button } from '@components/ui/button';
import { formatError } from '@lib/services/supabase/utils';
import { UpdateEmailSchema } from '@lib/services/supabase/validationSchema';
import {
  createClientComponentClient,
  type User,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Label } from 'recharts';
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
    setMessage('Email opdateret');
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
      <h2 className="mb-4 text-4xl font-semibold">Opdater Email</h2>
      <p className="mb-4 font-medium">
        Hej {user?.email}, Indtast din nye e-mail nedenfor og bekræft den
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <Label>Email</Label>
          <Input
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
        <div className="form-control my-4">
          <Label>Bekræft din email</Label>
          <Input
            id="emailConfirm"
            name="email"
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
          <button className="btn btn-primary rounded-xl border bg-white/10 px-2 py-2 text-black">
            Opdater Email
          </button>
        </div>
      </form>
      <div className="justify-flex flex justify-center">
        <Button asChild>
          <Link className="block w-full p-3" href="/account">
            Tilbage
          </Link>
        </Button>
      </div>
    </div>
  );
}
