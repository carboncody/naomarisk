/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Project, User } from '@models';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from 'src/components/ui/Charts/chart';
import 'src/components/ui/styles.css';

interface ProjectEmployeeChartProps {
  project?: Project;
  employee: User;
}

export function ProjectEmployeeChart({
  project,
  employee,
}: ProjectEmployeeChartProps) {
  // console.info(
  //   'employee: ',
  //   employee.projectUsers.map((p) => p.project),
  // );

  const chartData = [
    { month: 'January', risk: 5 },
    { month: 'February', risk: 3 },
    { month: 'March', risk: 3 },
    { month: 'April', risk: 3 },
    { month: 'May', risk: 2 },
    { month: 'June', risk: 2 },
  ];

  const chartConfig = {
    risk: {
      label: 'Risk',
      color: '#2563eb',
    },
  } satisfies ChartConfig;

  // const CustomBarShape = (props: any) => {
  //   return (
  //     <Rectangle
  //       x={x}
  //       y={y}
  //       width={width}
  //       height={height}
  //       fill={fillColor}
  //       radius={4}
  //       className="hover:cursor-pointer"
  //     />
  //   );
  // };

  return (
    <Card className="flex flex-col rounded-xl border-0 bg-white shadow-none dark:bg-zinc-950">
      <CardHeader className="items-center pb-0">
        <CardTitle>Antal Projekter</CardTitle>
        <CardDescription>
          Antal åbne risici som {employee.fullName} ejer{' '}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="5 5"
              className="stroke-zinc-300 dark:stroke-zinc-600"
            />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis
              domain={[0, 'dataMax']}
              tickCount={4}
              interval={0}
              label={{
                color: 'white',
                value: 'Antal Risici',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
              }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={<ChartTooltipContent labelKey="name" nameKey="Risici" />}
              cursor={{ opacity: 0.2 }}
            />
            <Bar dataKey="risk" fill="var(--color-risk)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
