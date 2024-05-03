'use client';
import Error from 'next/error';
import { usePathname } from 'next/navigation';

export function Project() {
  const pathName = usePathname();
  const projectId = pathName?.split('/projects/')[1];

  if (!projectId) {
    return <Error statusCode={404} title="Project not found in the url" />;
  }

  return (
    <div className="pt-20">
      <p>Project ID: {JSON.stringify(projectId)}</p>
    </div>
  );
}
