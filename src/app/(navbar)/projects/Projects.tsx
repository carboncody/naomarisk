'use client';

import { useProjectsInCompany } from '@lib/api/hooks';
import { Button, Spinner } from '@nextui-org/react';
import Error from 'next/error';
import Link from 'next/link';
import { ProjectTable } from './ProjectTable';

export function AllProjects() {
  const {
    data: allProjects,
    isFetching,
    isError,
    error,
  } = useProjectsInCompany();

  if (isFetching) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    <Error statusCode={500} message={error.message} />;
  }

  return (
    <div className="justify-top flex min-h-screen flex-col items-center bg-gradient-to-b  from-[#1c1c1c] to-[#2a2929] text-white">
      <h2 className="mb-4 mt-40 text-4xl font-semibold">
        All projectsmade are located here:
      </h2>
      <div></div>
      <div className="h-full w-3/4 ">
        <ProjectTable projects={allProjects ?? []} />
      </div>
      <div className=" justify-flex flex justify-center">
        <Link className="block w-full p-3" href="/">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}
