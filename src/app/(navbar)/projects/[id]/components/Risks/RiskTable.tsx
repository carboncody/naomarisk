'use client';

import { DataTable } from '@components/ui/data-table';
import { type Project, type Risk } from '@models';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DeleteRisk } from './DeleteRisk';
import EditRisk from './EditRisk';
import { riskTableColumns } from './riskTableColumns';

interface RiskTableProps {
  refetch: () => void;
  risks: Risk[];
  project: Project;
}

export default function RiskTable({ risks, project, refetch }: RiskTableProps) {
  const [riskBeingEdited, setRiskBeingEdited] = useState<Risk | null>(null);
  const [riskBeingDeleted, setRiskBeingDeleted] = useState<Risk | null>(null);
  const router = useRouter();

  const rows = risks.map((risk) => ({
    ...risk,
    riskScore:
      risk.probability && risk.consequence
        ? risk.probability * risk.consequence
        : 0,
  }));

  const handleRowClick = (risk: Risk) => {
    router.push(`/projects/${project.id}/risk/${risk.id}`);
  };

  const handleEdit = (risk: Risk) => {
    setRiskBeingEdited(risk);
  };

  const handleDelete = (risk: Risk) => {
    setRiskBeingDeleted(risk);
  };

  return (
    <>
      <DataTable
        columns={riskTableColumns({
          handleEdit,
          handleDelete,
          projectId: project.id,
        })}
        data={rows}
        onRowClick={handleRowClick}
      />

      {riskBeingDeleted && (
        <DeleteRisk
          isOpen={!!riskBeingDeleted}
          riskElement={riskBeingDeleted}
          setRiskBeingDeleted={setRiskBeingDeleted}
          project={project}
          refetch={refetch}
        />
      )}

      {riskBeingEdited && (
        <EditRisk
          isOpen={!!riskBeingEdited}
          riskElement={riskBeingEdited}
          setRiskBeingEdited={setRiskBeingEdited}
          project={project}
          refetch={refetch}
        />
      )}
    </>
  );
}
