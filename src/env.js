import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const envSchema = createEnv({
  server: {
    DATABASE_URL: z.string(),
    resendApiKey: z.string(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },

  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    resendApiKey: process.env.RESEND_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },

  emptyStringAsUndefined: true,
});

export const env = {
  get db() {
    return envSchema.DATABASE_URL;
  },
  get resendApiKey() {
    return envSchema.resendApiKey;
  },
  get supbase() {
    return {
      url: envSchema.NEXT_PUBLIC_SUPABASE_URL,
      key: envSchema.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    };
  },
};
