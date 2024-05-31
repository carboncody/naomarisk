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
          <span>Status: {risk.status}</span>
        </div>
      ),
      sort: sortBy('string'),
    },
    riskowner: {
      title: 'Ejer',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span>
            {risk.riskowner ? (
              risk.riskowner.email
            ) : (
              <em className="text-gray-400">Ingen ejer</em>
            )}
          </span>
        </div>
      ),
    },
    description: {
      title: 'Beskrivelse',
      spacing: 2,
      render: (risk: Risk) => (
        <div className="col-span-2 truncate">{risk.description}</div>
      ),
    },
    probability: {
      title: 'Risiko',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="flex gap-2">
          <div>
            <p>Sansynlighed :</p>
            <p>Konsekvens :</p>
          </div>
          <div>
            <p>
              {risk.probability ?? (
                <em className="text-gray-400">Ikke defineret</em>
              )}
            </p>
            <p>
              {risk.consequence ?? (
                <em className="text-gray-400">Ikke defineret</em>
              )}
            </p>
          </div>
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
