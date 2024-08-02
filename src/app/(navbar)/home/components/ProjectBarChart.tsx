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
} from '@components/ui/Charts/card';
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
      risici: project.risks.length,
      Brugere: project.projectUsers.length,
    }));
  }, [projects]);

  const chartConfig = {
    risici: {
      // icon: PiWarningFill,
      label: 'risici',
      color: 'hsl(var(--chart-1))',
    },
    Brugere: {
      // icon: FaUsers,
      label: 'Brugere',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col bg-zinc-200 shadow-xl">
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
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="risici" fill="var(--color-risici)" radius={4} />
            <Bar dataKey="Brugere" fill="var(--color-Brugere)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Projekter fordelt ved antal risici og deltagerer{' '}
          <GrStatusInfo className="h-4 w-4 " />
        </div>
      </CardFooter>
    </Card>
  );
}
