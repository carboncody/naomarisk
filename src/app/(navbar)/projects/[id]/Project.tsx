'use client';
import Error from 'next/error';
import { usePathname } from 'next/navigation';

export function Project() {
  const pathName = usePathname();
  const projectIdIndex = pathName?.split('/').indexOf('projects') + 1;
  const projectId = pathName?.split('/')[projectIdIndex];

  if (!projectId) {
    return <Error statusCode={404} title="Project not found in the url" />;
  }

  return (
    <>
      <p>Project ID: {JSON.stringify(projectId)}</p>
    </>
  );
}
