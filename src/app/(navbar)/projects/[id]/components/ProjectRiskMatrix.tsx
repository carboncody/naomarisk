import { CumulativeRiskMatrix } from '@components/RiskMatrix/CumulativeRiskMatrix';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import type { Risk } from '@models';
import { LiaTimesSolid } from 'react-icons/lia';

interface Props {
  risks: Risk[];
}

export function ProjectRiskMatrix({ risks }: Props) {
  return (
    <Card className="h-full border-0 bg-white shadow-none dark:bg-zinc-950">
      <CardHeader className="items-center pb-0">
        <CardTitle>Risiko Matrix</CardTitle>
        <CardDescription className="flex items-center gap-1">
          Risici: Sansynlighed <LiaTimesSolid /> Konsekvens{' '}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full flex-1 items-center pb-0">
        <CumulativeRiskMatrix risks={risks} />{' '}
      </CardContent>
    </Card>
  );
}
