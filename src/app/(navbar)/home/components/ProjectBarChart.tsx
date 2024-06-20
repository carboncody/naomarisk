import type { Project } from '@models';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ProjectBarChartProps {
  projects: Project[];
}

export function ProjectBarChart({ projects }: ProjectBarChartProps) {
  const data = useMemo(() => {
    return projects.map((project) => ({
      name: project.name,
      Risikoer: project.risks.length,
      Brugere: project.projectUsers.length,
    }));
  }, [projects]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Risikoer"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="Brugere"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
