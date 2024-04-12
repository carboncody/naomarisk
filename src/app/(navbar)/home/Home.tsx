import { SearchIcon } from '@components/SearchIcon';
import { createServerClient } from '@lib/services/supabase/supabase-server';
import { Input } from '@nextui-org/react';
import Link from 'next/link';

export async function Home() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b  from-[#1c1c1c] to-[#2a2929] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <p className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Naoma <span className="text-[hsl(0,0%,31%)]">Risk</span>
        </p>

        <p>Welcome {session?.user.email}</p>
        <div className="flex items-center justify-center rounded-2xl bg-transparent px-8 text-white ">
          <Input
            isClearable
            radius="lg"
            classNames={{
              label: 'text-black/50 dark:text-white/90',
              input: [
                'bg-transparent',
                'text-black/90 dark:text-white/90',
                'placeholder:text-default-700/50 dark:placeholder:text-white/60',
              ],
              innerWrapper: 'bg-transparent',
              inputWrapper: [
                'shadow-xl',
                'bg-default-200/50',
                'dark:bg-default/60',
                'backdrop-blur-xl',
                'backdrop-saturate-200',
                'hover:bg-default-200/70',
                'dark:hover:bg-default/70',
                'group-data-[focused=true]:bg-default-200/50',
                'dark:group-data-[focused=true]:bg-default/60',
                '!cursor-text',
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90" />
            }
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href=""
          >
            <p className="text-2xl font-bold">Project example 1 →</p>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href=""
          >
            <p className="text-2xl font-bold">Project example 2 →</p>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
