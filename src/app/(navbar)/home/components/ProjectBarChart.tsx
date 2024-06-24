import type { Project } from '@models';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
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
      Risici: project.risks.length,
      Medarbejdere: project.projectUsers.length,
    }));
  }, [projects]);

  return (
    <ResponsiveContainer
      className="rounded-lg p-4 shadow-2xl shadow-black"
      width="100%"
      height="100%"
    >
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
        <XAxis dataKey="name" className="text-white" />
        <YAxis />
        <Tooltip
          wrapperClassName="text-black bg-white/50 backdrop-blur-md rounded-lg"
          cursor={false}
          filterNull
          separator=" -> "
        />
        <Legend />
        <Bar
          dataKey="Risici"
          fill="#ffeb3a"
          activeBar={<Rectangle fill="yellow" stroke="#4caf4f" />}
        />
        <Bar
          dataKey="Medarbejdere"
          fill="#4caf4f"
          activeBar={<Rectangle fill="green" stroke="yellow" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
