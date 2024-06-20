import type { Risk } from '@models';
import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

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
      OPEN: '#ffeb3b',
      CLOSED: '#4caf50',
    };
    return Object.entries(taskCountByStatus).map(([status, count]) => ({
      value: count,
      name: status,
      fillColor: statusColors[status as RiskStatus] ?? '#000000',
    }));
  }, [taskCountByStatus]);

  return (
    <ResponsiveContainer width="100%" height={'100%'}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="50%"
          outerRadius="60%"
          label={({ name, value }) => `${name} -> ${value}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fillColor} />
          ))}
        </Pie>
        <Tooltip
          wrapperClassName="text-left dark:bg-adjera-dark-700/80 bg-white/50 backdrop-blur-md dark:shadow-black rounded border-gray-200 dark:border-adjera-dark-500"
          itemStyle={{ color: 'black dark:white' }}
          cursor={false}
          filterNull
          separator="->"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
