'use client';

import { Button } from '@components/ui/button';
import { DataTable } from '@components/ui/data-table';
import { type Phase, type Project } from '@models';
import { useState } from 'react';
import CreatePhase from './CreatePhase';
import { DeletePhase } from './DeletePhase';
import EditPhase from './EditPhase';
import { phaseTableColumns } from './phaseTableColumns';

interface PhaseTableProps {
  project: Project;
  refetch: () => void;
}

export function PhaseTable({ project, refetch }: PhaseTableProps) {
  const [phaseBeingEdited, setPhaseBeingEdited] = useState<Phase | null>(null);
  const [phaseBeingDeleted, setPhaseBeingDeleted] = useState<Phase | null>(
    null,
  );
  const [isNewOpen, setIsNewOpen] = useState(false);

  const handleEdit = (phase: Phase) => {
    setPhaseBeingEdited(phase);
  };

  const handleDelete = (phase: Phase) => {
    setPhaseBeingDeleted(phase);
  };

  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between gap-28">
        <p className="text-3xl font-semibold">Faser i dette projekt</p>
        <Button
          variant="default"
          className="my-4 justify-end font-semibold"
          onClick={() => setIsNewOpen(true)}
        >
          Ny Fase
        </Button>
      </div>
      <div className="w-full overflow-y-auto rounded-md p-4">
        <DataTable
          columns={phaseTableColumns({
            handleEdit,
            handleDelete,
            projectId: project.id,
            risks: project.risks,
          })}
          data={project.phases}
        />

        {phaseBeingDeleted && (
          <DeletePhase
            isOpen={!!phaseBeingDeleted}
            phaseElement={phaseBeingDeleted}
            setPhaseBeingDeleted={setPhaseBeingDeleted}
            project={project}
            refetch={refetch}
          />
        )}

        {phaseBeingEdited && (
          <EditPhase
            isOpen={!!phaseBeingEdited}
            refetch={refetch}
            setPhaseBeingEdited={setPhaseBeingEdited}
            project={project}
            phaseElement={phaseBeingEdited}
          />
        )}
        <CreatePhase
          isOpen={isNewOpen}
          setIsOpen={setIsNewOpen}
          refetch={refetch}
          project={project}
        />
      </div>
    </>
  );
}
