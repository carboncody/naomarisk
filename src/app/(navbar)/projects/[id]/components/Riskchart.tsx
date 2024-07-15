import { ColorMap, RiskMap, type Thresholds } from '@lib/calc/threshholds';
import type { Project, Risk } from '@models';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface RiskChartProps {
  projects: Project;
  refetch: () => void;
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
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const antal = projects!.risks.filter((risk: Risk) =>
        risk.probability && risk.consequence
          ? risk.probability * risk.consequence === score
          : false,
      ).length;

      const riskThreshold = RiskMap[score];
      const color = ColorMap[riskThreshold! as Thresholds];
      console.info(riskscore, color);

      return {
        name: riskscore,
        fillColor: color,
        antal,
      };
    });
  }, [projects]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomBarShape = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { x, y, width, height, fillColor } = props;
    return (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      <Rectangle x={x} y={y} width={width} height={height} fill={fillColor} />
    );
  };

  return (
    <ResponsiveContainer className="rounded-lg p-4" width="100%" height={400}>
      <BarChart
        width={400}
        height={400}
        data={riskData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <XAxis
          dataKey="name"
          className="text-white"
          label={{ value: 'Risk Score', position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          domain={[0, 'dataMax']}
          tickCount={4}
          interval={0}
          label={{
            value: 'Antal Risici',
            angle: -90,
            position: 'insideLeft',
            offset: 10,
          }}
        />
        <Tooltip
          wrapperClassName="text-black bg-white/50 backdrop-blur-md rounded-lg"
          cursor={false}
          filterNull
          separator=" -> "
        />
        <Bar dataKey="antal" shape={<CustomBarShape />} />
      </BarChart>
    </ResponsiveContainer>
  );
}
