/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Project } from '@models';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from 'src/components/ui/Charts/chart';
import 'src/components/ui/styles.css';

interface RiskChartProps {
  project?: Project;
}

interface RiskData {
  name: string;
  fillColor: string;
  antal: number;
}

export function ProjectEmployeeChart({ project }: RiskChartProps) {
  //   const router = useRouter();
  //   const riskData = useMemo<RiskData[]>(() => {
  //     return Object.keys(RiskMap).map((riskscore) => {
  //       const score = Number(riskscore);
  //       const antal = project.risks.filter((risk: Risk) =>
  //         risk.probability && risk.consequence
  //           ? risk.probability * risk.consequence === score
  //           : false,
  //       ).length;

  //       const riskThreshold = RiskMap[score];
  //       const color = ColorMap[riskThreshold! as Thresholds];

  //       return {
  //         name: riskscore,
  //         fillColor: color,
  //         antal,
  //       };
  //     });
  //   }, [project]);

  //   const chartConfig = {
  //     Risici: {
  //       label: 'Risici',
  //     },
  //   } satisfies ChartConfig;

  const chartData = [
    { month: 'January', desktop: 5 },
    { month: 'February', desktop: 3 },
    { month: 'March', desktop: 3 },
    { month: 'April', desktop: 3 },
    { month: 'May', desktop: 2 },
    { month: 'June', desktop: 2 },
  ];

  const chartConfig = {
    desktop: {
      label: 'riskscore',
      color: '#2563eb',
    },
  } satisfies ChartConfig;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomBarShape = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { x, y, width, height, fillColor } = props;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        radius={4}
        className="hover:cursor-pointer"
      />
    );
  };

  return (
    <Card className="flex flex-col rounded-xl border-0 bg-white shadow-none dark:bg-zinc-950">
      <CardHeader className="items-center pb-0">
        <CardTitle>Antal Projekter</CardTitle>
        <CardDescription>
          Antal åbne risici som (FullName) ejer{' '}
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
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={4}
              //   shape={<CustomBarShape />}
              //   onClick={(e) => {
              //     const typedEvent = e as unknown as { name: string };
              //     if (typedEvent.name) {
              //       router.push(
              //         `/projects/${project.id}?view=risks&score=${typedEvent.name}`,
              //       );
              //     }
              //   }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
