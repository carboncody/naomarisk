import { z } from 'zod';
import { email, password, required } from './validationRules';

export const AuthUserSchema = z.object({
  email: email(),
  password: password(6),
});

export const ForgotPasswordSchema = z.object({
  email: email(),
});

export const AuthUserWithTokenSchema = z.object({
  email: email(),
  token: required('Token'),
});

export const UpdatePasswordSchema = z
  .object({
    password: password(6),
    passwordConfirm: password(6, 'Koden'),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'Koderne er ikke ens',
        path: ['passwordConfirm'],
      });
    }
  });

export const UpdateEmailSchema = z
  .object({
    email: email(),
    emailConfirm: email('Confirm Email'),
  })
  .superRefine(({ email, emailConfirm }, ctx) => {
    if (email !== emailConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'Email er ikke ens',
        path: ['emailConfirm'],
      });
    }
  });
