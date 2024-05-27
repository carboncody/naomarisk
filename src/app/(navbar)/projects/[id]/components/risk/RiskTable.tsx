import { Table } from '@components/Table';
import { sortBy } from '@components/Table/sorting/sort.utils';
import { type TableColumns } from '@components/Table/types/table.columns';
import { type Risk } from '@models';
import { useRouter } from 'next/navigation';

export function RiskTable({ risk }: { risk: Risk[] }) {
  const rows: Risk[] = risk;
  const router = useRouter();

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
    <Table
      onRowClick={(risk) => router.push(`/risk/${risk.id}`)}
      columns={columns}
      rows={rows}
    />
  );
}
