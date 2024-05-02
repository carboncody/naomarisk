import { Table } from '@components/Table';
import { sortBy } from '@components/Table/sorting/sort.utils';
import { type TableColumns } from '@components/Table/types/table.columns';
import { type Project } from '@models';
import dayjs from 'dayjs';

interface ProjectTableProps {
  projects: Project[];
  name: string;
  createdAt: Date;
  budget?: string;
  startDate: Date;
  dueDate: Date;
  description: string;
}

export function ProjectTable({ projects }: ProjectTableProps) {
  type ProjectRowType = Project & {
    name: string;
    createdAt: Date;
    budget?: string;
    startDate: Date;
    dueDate: Date;
    description: string;
  };

  const rows: ProjectRowType[] = projects.map((Project) => {
    return {
      ...Project,
    };
  });

  const columns: TableColumns<ProjectRowType> = {
    name: {
      title: 'NAVN',
      spacing: 2,
      render: (project: ProjectRowType) => (
        <div className="truncate">
          <span>{project.name}</span>
          <br />
          <span className="break-words text-gray-400">
            {project.description}
          </span>
        </div>
      ),
      sort: sortBy('string'),
    },
    createdAt: {
      title: 'Opretttet',
      spacing: 2,
      render: (project: ProjectRowType) => (
        <div className="truncate">
          <span>{dayjs(project.createdAt).format('DD MMM')}</span>
        </div>
      ),
    },

    budget: {
      title: 'BUDGET',
      spacing: 2,
      render: (project: ProjectRowType) => (
        <div className="truncate">
          <span>{project.budget}</span>
        </div>
      ),
    },
    startDate: {
      title: 'Periode',
      spacing: 3,
      render: (project: ProjectRowType) => (
        <div className="truncate">
          <span>
            {dayjs(project.startDate).format('DD MMM')} -{' '}
            {dayjs(project.dueDate).format('DD MMM')}
          </span>
        </div>
      ),
    },
  };

  return <Table columns={columns} rows={rows} />;
}
