import { Table } from '@components/Table';
import { sortBy } from '@components/Table/sorting/sort.utils';
import { type TableColumns } from '@components/Table/types/table.columns';
import { type Project } from '@models';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export function ProjectTable({ projects }: { projects: Project[] }) {
  const rows: Project[] = projects;
  const router = useRouter();

  const columns: TableColumns<Project> = {
    name: {
      title: 'NAVN',
      spacing: 1,
      render: (project: Project) => (
        <div className="truncate">
          <span>{project.name}</span>
          <br />
          <span className="text-Zinc-400 break-words">
            {project.description}
          </span>
        </div>
      ),
      sort: sortBy('string'),
    },
    createdAt: {
      title: 'OPRETTET',
      spacing: 1,
      render: (project: Project) => (
        <div className="truncate">
          <span>{dayjs(project.createdAt).format('kl. HH:MM - DD MMM')}</span>
        </div>
      ),
    },

    budget: {
      title: 'RISKS',
      spacing: 1,
      render: (project: Project) => (
        <div className="truncate">
          <span>{project.risks.length}</span>
        </div>
      ),
    },
    startDate: {
      title: 'PERIODE',
      spacing: 1,
      render: (project: Project) => (
        <div className="truncate">
          <span className="flex items-center gap-1">
            {dayjs(project.startDate).format('DD MMM')}
            <span className="text-Zinc-400">-</span>
            {project.dueDate ? (
              dayjs(project.dueDate).format('DD MMM')
            ) : (
              <p className="text-Zinc-400">No due date</p>
            )}
          </span>
        </div>
      ),
    },
  };

  return (
    <Table
      onRowClick={(project) => router.push(`/projects/${project.id}`)}
      columns={columns}
      rows={rows}
    />
  );
}
