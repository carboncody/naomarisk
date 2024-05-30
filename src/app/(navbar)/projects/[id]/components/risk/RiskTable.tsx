import { Table } from '@components/Table';
import { sortBy } from '@components/Table/sorting/sort.utils';
import { type TableColumns } from '@components/Table/types/table.columns';
import { type Project, type Risk } from '@models';
import { useState } from 'react';
import EditRisk from './EditRisk';

interface RiskTableProps {
  refetch: () => void;
  risks: Risk[];
  project: Project;
}

export default function RiskTable({ risks, project, refetch }: RiskTableProps) {
  const rows: Risk[] = risks;
  const [riskBeingEdited, setRiskBeingEdited] = useState<Risk | null>(null);

  const columns: TableColumns<Risk> = {
    id: {
      title: 'Risk-ID',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span>{risk.customId}</span>
          <br />
          <span className="break-words text-gray-400">
            Status: {risk.status}
          </span>
        </div>
      ),
      sort: sortBy('string'),
    },
    description: {
      title: 'Beskrivelse',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span className="break-words text-gray-400">{risk.description}</span>
        </div>
      ),
    },
    probability: {
      title: 'Risiko',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span className="break-words text-gray-400">
            Sansynlighed: {risk.probability}
          </span>
          <br />
          <span className="break-words text-gray-400">
            Konsekvens: {risk.consequence}
          </span>
        </div>
      ),
    },
    riskowner: {
      title: 'Ejer',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span className="break-words text-gray-400">
            {risk.riskowner.email}
          </span>
        </div>
      ),
    },
  };

  return (
    <>
      <Table
        onRowClick={(risk) => setRiskBeingEdited(risk)}
        columns={columns}
        rows={rows}
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
