import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/Charts/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ColorMap, Thresholds, getThreshold } from '@lib/calc/threshholds';
import type { Risk } from '@models';
import { RiskStatus } from '@models';
import { useState } from 'react';
import { Cell, Pie, PieChart, Sector } from 'recharts';
import { type PieSectorDataItem } from 'recharts/types/polar/Pie';

export const description =
  'A larger donut chart showing risk score distribution';

export function RiskScorePieChart({ risks }: { risks: Risk[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const calculateRiskScores = (risks: Risk[]) => {
    const scores = {
      GREEN: 0,
      YELLOW: 0,
      RED: 0,
      UNDEFINED: 0,
    };

    risks.forEach((risk) => {
      if (risk.status === RiskStatus.Open) {
        const threshold = getThreshold(risk);
        if (risk.probability === null || risk.consequence === null) {
          scores.UNDEFINED++;
        } else {
          scores[Thresholds[threshold] as keyof typeof scores]++;
        }
      }
    });

    return Object.entries(scores)
      .map(([name, value]) => ({ name, value }))
      .filter((entry) => entry.value > 0);
  };

  const chartData = calculateRiskScores(risks);

  const COLORS = {
    GREEN: ColorMap[Thresholds.GREEN],
    YELLOW: ColorMap[Thresholds.YELLOW],
    RED: ColorMap[Thresholds.RED],
    UNDEFINED: '#9e9e9e',
  };

  const labelMap = {
    GREEN: 'Lave',
    YELLOW: 'Medium',
    RED: 'Kritiske',
    UNDEFINED: 'Udefinieret',
  };

  const chartConfig: ChartConfig = {
    value: {
      label: 'Risks',
    },
    ...chartData.reduce(
      (acc, { name }) => ({
        ...acc,
        [name]: {
          label: `${labelMap[name as keyof typeof labelMap]} risici`,
          color: COLORS[name as keyof typeof COLORS],
        },
      }),
      {},
    ),
  };

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: PieSectorDataItem) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
    } = props;
    const payloadObject = (Array.isArray(payload) ? payload[0] : payload) as {
      name: string;
    };
    const label = labelMap[payloadObject.name as keyof typeof labelMap];
    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={-15}
          textAnchor="middle"
          className="fill-zinc-900 dark:fill-zinc-100"
          fontSize="16px"
        >
          {`${label} risici`}
        </text>
        <text
          x={cx}
          y={cy}
          dy={15}
          textAnchor="middle"
          className="fill-zinc-900 dark:fill-zinc-100"
          fontSize="16px"
        >
          {`${(percent! * 100).toFixed(2)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={props.outerRadius ?? 0 + 6}
          outerRadius={props.outerRadius ?? 0 + 10}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <Card className="mx-auto flex w-full max-w-3xl flex-col shadow-xl dark:border-transparent dark:bg-zinc-900">
      <CardHeader className="items-center pb-0">
        <CardTitle>Åbne risici fordelt</CardTitle>
        <CardDescription>
          Nuværende risici status over alle projekter
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={140}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as keyof typeof COLORS]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mt-4 flex-col gap-2 text-sm">
        <div className="flex flex-wrap justify-center gap-4">
          {chartData.map(({ name, value }) => (
            <div key={name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[name as keyof typeof COLORS] }}
              />
              <span>{`${labelMap[name as keyof typeof labelMap]} risici: ${value}`}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
