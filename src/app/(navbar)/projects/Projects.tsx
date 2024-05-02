'use client';

import { useProjectsInCompany } from '@lib/api/hooks';
import { Button, Spinner } from '@nextui-org/react';
import Error from 'next/error';
import Link from 'next/link';

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b  from-[#1c1c1c] to-[#2a2929] text-white">
      <h2 className="mb-4 text-4xl font-semibold">
        All projects ever made are located here
      </h2>
      <div>
        {allProjects && allProjects.length > 0 ? (
          allProjects.map((project) => (
            <Link
              className="block w-full p-3"
              href={`/projects/${project.id}`}
              key={project.id}
            >
              <Button>{project.name}</Button>
            </Link>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </div>
      <div className=" justify-flex flex justify-center">
        <Link className="block w-full p-3" href="/">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}
