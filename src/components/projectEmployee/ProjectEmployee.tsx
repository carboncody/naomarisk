'use client';

import LoadingSpinner from '@components/ui/LoadSpinner';
import { User } from '@lib/api/hooks';
import Error from 'next/error';
import { ProjectEmployeeTable } from './ProjectEmployeeTable';

export function ProjectEmployee() {
  // const [isNewOpen, setIsNewOpen] = useState(false);

  const { data: allEmployees, isFetching, isError, error, refetch } = User();

  if (isFetching) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    <Error statusCode={500} message={error.message} />;
  }

  return (
    <>
      <div className="justify-top flex min-h-screen flex-col items-center px-8 text-white">
        <div className="mb-4 flex w-full justify-between">
          <p className="mt-5 text-3xl font-semibold">
            Medarbjedere i dette projekt
          </p>
          {/* <Button className="w-32" onClick={() => setIsNewOpen(true)}>
            Tilføj
          </Button> */}
        </div>
        <ProjectEmployeeTable employee={allEmployees ?? []} />
        {/* <div className=" justify-flex flex justify-center">
          <Backbutton href={'/'} />
        </div> */}
      </div>
      {/* {isNewOpen && (
        <CreateRisk
          isOpen={isNewOpen}
          setIsOpen={setIsNewOpen}
          refetch={refetch}
        />
      )} */}
    </>
  );
}
