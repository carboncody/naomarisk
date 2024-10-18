import { z } from 'zod';

export const required = (name: string) =>
  z.string().min(1, `${name} is required`);
export const email = (name = 'Email') =>
  required(name).email(`${name} er ikke valid`);
export const password = (number = 5, name = 'Koden') =>
  required(name).min(number, `${name} skal mindst være ${number} karakterer`);
