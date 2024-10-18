'use client';
import Alert from '@components/ui/Alert';
import { Input } from '@components/ui/Input';
import InputErrorMessage from '@components/ui/InputErrorMessage';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { formatError } from '@lib/services/supabase/utils';
import { UpdateEmailSchema } from '@lib/services/supabase/validationSchema';
import {
  createClientComponentClient,
  type User,
} from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
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
    toast.success('Din Email blev opdateret.');
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="mt-10 flex w-full max-w-md flex-col rounded-lg border p-5 text-white dark:border-transparent dark:bg-zinc-900">
        {message ? (
          <Alert
            className={`${formSuccess ? 'alert-info' : 'alert-error'} mb-10`}
          >
            {message}
          </Alert>
        ) : null}
        <h2 className="top-0 mb-4 text-4xl font-semibold text-black dark:text-white">
          Opdater Email
        </h2>
        <p className="mb-4 font-medium text-black dark:text-white">
          Hej {user?.email}, Indtast din nye e-mail nedenfor og bekræft den
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <Label className="mb-2">Email</Label>
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
            <Label className="mb-2">Bekræft din email</Label>
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
            <Button>Opdater Email</Button>
          </div>
        </form>
        <div className="justify-flex mt-5 flex justify-center">
          <Button>
            <Link className="block p-3" href="/account">
              Tilbage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
