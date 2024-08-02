import { type Risk } from '@models';
import { useMemo } from 'react';
import { FaLockOpen } from 'react-icons/fa6';
import { IoLockClosed } from 'react-icons/io5';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import 'src/components/ui/styles.css';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from 'src/components/ui/Charts/chart';

import { GrStatusInfo } from 'react-icons/gr';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Charts/card';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
interface RisksPiechartProps {
  risks: Risk[];
}

export function RisksPiechart({ risks }: RisksPiechartProps) {
  const taskCountByStatus = useMemo(() => {
    return risks.reduce(
      (acc, risk) => {
        acc[risk.status] = (acc[risk.status] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [risks]);

  type RiskStatus = 'OPEN' | 'CLOSED';

  const data = useMemo(() => {
    const statusColors: Record<RiskStatus, string> = {
      OPEN: 'hsl(var(--chart-1))',
      CLOSED: 'hsl(var(--chart-2))',
    };
    return Object.entries(taskCountByStatus).map(([status, count]) => ({
      value: count,
      name: status === 'CLOSED' ? 'Lukkede risici' : 'Åbne risici',
      fillColor:
        statusColors[status as RiskStatus] ?? 'hsl(var(--chart-default))',
    }));
  }, [taskCountByStatus]);

  const chartConfig = {
    OPEN: {
      icon: FaLockOpen,
      label: 'Åbnerisici',
      color: 'hsl(var(--chart-1))',
    },
    CLOSED: {
      icon: IoLockClosed,
      label: 'Lukkede risici',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col bg-zinc-200 shadow-xl">
      <CardHeader className="items-center pb-0">
        <CardTitle>Risici Status</CardTitle>
        <CardDescription>Alle projekter</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full rounded-lg p-4 "
        >
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius="60%"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 5} />
              )}
              label={({ name, value }) => `${name} -> ${value}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fillColor} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} label={true} />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Risici fordelt ved status <GrStatusInfo className="h-4 w-4 " />
        </div>
      </CardFooter>
    </Card>
  );
}
