/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@components/ui/Charts/chart';
import { RiskStatus, type Project } from '@models';
import { Cell, Pie, PieChart } from 'recharts';
import 'src/components/ui/styles.css';

interface RiskPieChartProps {
  project: Project;
}

export function RiskPieChart({ project }: RiskPieChartProps) {
  const open = project.risks.filter(
    (risk) => risk.status === RiskStatus.Open,
  ).length;
  const closed = project.risks.filter(
    (risk) => risk.status === RiskStatus.Closed,
  ).length;
  const total = project.risks.length;

  const data = [
    {
      name: 'Lukket',
      value: closed,
      // fill: '#00b10e',
      fill: 'hsl(var(--Lukket))',
      label: 'Åbne risici',
    },
    {
      name: 'Åben',
      value: open,
      fill: 'hsl(var(--Åben))',
      // fill: '#FF0000',
      label: 'alle risici',
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      <PieChart width={50} height={50}>
        <Pie
          dataKey="value"
          data={data}
          isAnimationActive={false}
          innerRadius="80%"
          className="stroke-none"
          outerRadius="100%"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              className="border-0 stroke-none outline-none focus:outline-none"
              fill={entry.fill}
            />
          ))}
          <ChartTooltip content={<ChartTooltipContent />} label={true} />
          <ChartLegend content={<ChartLegendContent />} />
        </Pie>
      </PieChart>
      <div className="flex flex-col gap-2">
        <span> {(((total - open) / total) * 100).toFixed(1)}% fremdrift</span>
        <span className="flex gap-1">
          <p className="text-red-500 dark:text-red-400">{open} Åbne risici</p> /{' '}
          <p className="text-green-600 dark:text-green-400">
            {closed} Lukkede risici
          </p>
        </span>
      </div>
    </div>
  );
}
