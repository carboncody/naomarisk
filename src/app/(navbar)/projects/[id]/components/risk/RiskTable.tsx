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
              risk.riskowner.fullName
            ) : (
              <em className="text-gray-400">Ingen ejer</em>
            )}
          </span>
        </div>
      ),
    },
    description: {
      title: 'Beskrivelse',
      spacing: 2, // Adjust spacing to span 2 columns
      render: (risk: Risk) => (
        <div className="col-span-2 truncate">{risk.description}</div> // Add col-span-2
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
      <div className="grid grid-cols-5 gap-4 text-white/0">
        <div className="col-span-1">Risk-ID</div>
        <div className="col-span-1">Ejer</div>
        <div className="col-span-2">Beskrivelse</div>
        <div className="col-span-1">Risiko</div>
      </div>
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
