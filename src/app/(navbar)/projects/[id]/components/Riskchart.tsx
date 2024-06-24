import { ColorMap, RiskMap } from '@lib/calc/threshholds';
import type { Project} from '@models';
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


interface RiskChartProps {
  projects: Project;
}

export function RiskChart({ projects }: RiskChartProps) {
  const riskData = useMemo(() => {
    return Object.keys(RiskMap).map((riskscore) => {
      const score = Number(riskscore);
      const count = projects?.risks.filter((risk) =>
        risk.probability && risk.consequence
          ? risk.probability * risk.consequence === score
          : false,
      ).length;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const color = ColorMap[RiskMap[score]];
      console.info(riskscore, color);
      return {
        name: riskscore,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        fillColor: color,
        count,
      };
    });
  }, [projects?.risks]);

  console.log(riskData);

  // Custom shape to use the fillColor property from riskData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomBarShape = (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { x, y, width, height, fillColor } = props;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return <Rectangle x={x} y={y} width={width} height={height} fill={fillColor} />;
  };

  return (
    <ResponsiveContainer
      className="rounded-lg p-4 shadow-2xl shadow-black"
      width="100%"
      height={300}
    >
      <BarChart
        width={500}
        height={300}
        data={riskData}
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
          dataKey="count"
          shape={<CustomBarShape />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
