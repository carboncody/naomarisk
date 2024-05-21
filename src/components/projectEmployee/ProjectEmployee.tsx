'use client';

import { type User } from '@models';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import AddOrRemoveEmployee from './AddOrRemoveEmployee';
import { ProjectEmployeeTable } from './ProjectEmployeeTable';

interface ProjectEmployeeProps {
  members: User[];
  refetch: () => void;
}

export function ProjectEmployee({ members, refetch }: ProjectEmployeeProps) {
  const [isNewOpen, setIsNewOpen] = useState(false);

  return (
    <>
      <div className="justify-top flex min-h-screen flex-col items-center px-8 text-white">
        <div className="mb-4 flex w-full items-center justify-between">
          <p className="text-3xl font-semibold">Medarbjedere i dette projekt</p>
          <Button
            className="my-4 justify-end font-semibold"
            onClick={() => setIsNewOpen(true)}
          >
            Tilføj / fjern medlemmer
          </Button>
        </div>
        <ProjectEmployeeTable employee={members ?? []} />
      </div>
      {isNewOpen && (
        <AddOrRemoveEmployee
          isOpen={isNewOpen}
          setIsOpen={setIsNewOpen}
          refetch={refetch}
          members={[]}
        />
      )}
    </>
  );
}
