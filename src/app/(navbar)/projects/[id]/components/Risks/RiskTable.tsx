import { Table } from '@components/Table';
import { sortBy } from '@components/Table/sorting/sort.utils';
import { type TableColumns } from '@components/Table/types/table.columns';
import { ColorMap, RiskMap } from '@lib/calc/threshholds';
import { type Project, type Risk } from '@models';
import clsx from 'clsx';
import { useState } from 'react';
import EditRisk from './EditRisk';

interface RiskTableProps {
  refetch: () => void;
  risks: Risk[];
  project: Project;
}

export default function RiskTable({ risks, project, refetch }: RiskTableProps) {
  type Row = Risk & { riskScore: number };

  const rows: Row[] = risks.map((risk) => ({
    ...risk,
    riskScore:
      risk.probability && risk.consequence
        ? risk.probability * risk.consequence
        : 0,
  }));
  const [riskBeingEdited, setRiskBeingEdited] = useState<Risk | null>(null);

  function getStyleColor(risk: Risk): string | undefined {
    const riskValue =
      risk.probability && risk.consequence
        ? risk.probability * risk.consequence
        : 0;
    const threshold = RiskMap[riskValue];
    if (threshold === undefined) {
      return undefined;
    }
    return ColorMap[threshold];
  }

  const columns: TableColumns<Row> = {
    customId: {
      title: 'Risk-ID',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span>{risk.customId}</span>
        </div>
      ),
      sort: sortBy('number'),
    },
    riskowner: {
      title: 'Ejer',
      spacing: 1,
      render: (risk: Risk) => (
        <div className="truncate">
          <span>
            {risk.riskowner ? (
              risk.riskowner.fullName ?? risk.riskowner.email
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
      sort: sortBy('string'),
    },
    riskScore: {
      title: 'Risiko -> Risikoscore',
      spacing: 1,
      render: (risk: Risk) => (
        <div
          style={{
            color: getStyleColor(risk),
          }}
          className={clsx('flex items-center gap-2')}
        >
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
          {risk.probability && risk.consequence && (
            <em>
              {' '}
              {'->'} {risk.probability * risk.consequence}
            </em>
          )}
        </div>
      ),
      sort: sortBy('number'),
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
        expanding
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
