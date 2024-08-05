import { ColorMap, RiskMap, type Thresholds } from '@lib/calc/threshholds';
import type { Project, Risk } from '@models';
import { useMemo } from 'react';

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
import 'src/components/ui/styles.css';
import { Bar, BarChart, Rectangle, XAxis, YAxis } from 'recharts';

interface RiskChartProps {
  projects: Project;
}

interface RiskData {
  name: string;
  fillColor: string;
  antal: number;
}

export function RiskChart({ projects }: RiskChartProps) {
  const riskData = useMemo<RiskData[]>(() => {
    return Object.keys(RiskMap).map((riskscore) => {
      const score = Number(riskscore);
      const antal = projects.risks.filter((risk: Risk) =>
        risk.probability && risk.consequence
          ? risk.probability * risk.consequence === score
          : false,
      ).length;

      const riskThreshold = RiskMap[score];
      const color = ColorMap[riskThreshold! as Thresholds];

      return {
        name: riskscore,
        fillColor: color,
        antal,
      };
    });
  }, [projects]);

  const chartConfig = {
    Risici: {
      label: 'Risici',
    },
  } satisfies ChartConfig;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomBarShape = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { x, y, width, height, fillColor } = props;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return <Rectangle x={x} y={y} width={width} height={height} fill={fillColor} />;
  };

  return (
    <Card className="flex flex-col bg-zinc-200 shadow-xl">
      <CardHeader className="items-center pb-0">
        <CardTitle>Risikooversigt</CardTitle>
        <CardDescription>Antal risici baseret på risikoscore</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-200 w-full">
            <BarChart
              data={riskData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
              />
              {/* <YAxis
                domain={[0, 'dataMax']}
                tickCount={4}
                interval={0}
                label={{
                  color: 'white',
                  value: 'Antal Risici',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                }} */}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                wrapperClassName="text-black bg-white/50 backdrop-blur-md rounded-lg"
                cursor={true}
                filterNull
                separator=" -> "
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="antal" shape={<CustomBarShape />} />
            </BarChart>
          <ChartLegend content={<ChartLegendContent />} />
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Risikoscore
        </div>
      </CardFooter>
    </Card>
  );
}
