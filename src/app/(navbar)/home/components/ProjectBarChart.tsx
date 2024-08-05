import { type Project } from '@models';
import { useMemo } from 'react';
import { GrStatusInfo } from 'react-icons/gr';
import { Bar, BarChart, XAxis } from 'recharts';
import 'src/components/ui/styles.css';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from 'src/components/ui/Charts/chart';

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

  const chartConfig = {
    Risici: {
      // icon: PiWarningFill,
      label: 'Risici',
      color: 'hsl(var(--chart-1))',
    },
    Medarbejdere: {
      // icon: FaUsers,
      label: 'Medarbejdere',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col bg-zinc-200 shadow-xl dark:bg-zinc-800">
      <CardHeader className="items-center pb-0">
        <CardTitle>Projekt Oversigt</CardTitle>
        <CardDescription>Alle projekter</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
              tickFormatter={(value) => value.slice(0, 6)}
              className="truncate"
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="Risici" fill="var(--color-Risici)" radius={4} />
            <Bar
              dataKey="Medarbejdere"
              fill="var(--color-Medarbejdere)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Projekter fordelt ved antal Risici og deltagerer{' '}
          <GrStatusInfo className="h-4 w-4 " />
        </div>
      </CardFooter>
    </Card>
  );
}
