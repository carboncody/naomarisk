'use client';

import { DataTable } from '@components/ui/data-table';
import { type Project, type Risk } from '@models';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditRisk from './EditRisk';
import { columns } from './colums';

interface RiskTableProps {
  refetch: () => void;
  risks: Risk[];
  project: Project;
}

export default function RiskTable({ risks, project, refetch }: RiskTableProps) {
  const router = useRouter();
  const [riskBeingEdited, setRiskBeingEdited] = useState<Risk | null>(null);

  const rows = risks.map((risk) => ({
    ...risk,
    riskScore:
      risk.probability && risk.consequence
        ? risk.probability * risk.consequence
        : 0,
  }));

  // const handleRowClick = (risk: Risk) => {
  //   router.push(`/projects/${project.id}/risk/${risk.id}`);
  // };

  const handleEdit = (risk: Risk) => {
    setRiskBeingEdited(risk);
  };

  return (
    <>
      <DataTable
        columns={columns({ handleEdit, projectId: project.id })}
        data={rows}
        // onRowClick={handleRowClick}
      />

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
