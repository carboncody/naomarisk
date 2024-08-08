import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@components/ui/hover-card';
import { ColorMap, RiskMap, Thresholds } from '@lib/calc/threshholds';
import { cn } from '@lib/utils';
import type { Risk } from '@models';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import {
  ConsequenceDescription,
  ProbabilityDescription,
} from './RiskMatrixDescription';

interface CumulativeRiskMatrixProps {
  risks: Risk[];
  href?: string;
}

export function CumulativeRiskMatrix({
  risks,
  href,
}: CumulativeRiskMatrixProps) {
  const router = useRouter();

  return (
    <div className="flex -translate-x-6 items-center dark:text-zinc-300">
      <em className="-ml-16 translate-x-8 rotate-[270deg] text-xs md:text-sm">
        Sandsynlighed
      </em>
      <div className="flex flex-col items-center">
        {[5, 4, 3, 2, 1].map((probability) => (
          <div key={probability} className="flex">
            <HoverCard>
              <HoverCardTrigger className="mr-4 flex w-2 flex-shrink-0 select-none items-center justify-center text-xs hover:cursor-pointer hover:opacity-70 md:text-sm">
                {probability}
              </HoverCardTrigger>
              <HoverCardContent className="w-60 gap-2 text-sm">
                <span>Sandsynligheden {probability} beskrives som </span>
                <span className="underline">
                  {ProbabilityDescription[probability]?.toLowerCase()}
                </span>
              </HoverCardContent>
            </HoverCard>
            {[1, 2, 3, 4, 5].map((consequence) => {
              const count = risks.filter(
                (risk) =>
                  risk.probability === probability &&
                  risk.consequence === consequence,
              ).length;
              const score = probability * consequence;
              const threshold = RiskMap[score];
              const color = threshold ? ColorMap[threshold] : 'green';
              return (
                <HoverCard key={`${probability}-${consequence}`}>
                  <HoverCardTrigger>
                    <div
                      className={clsx(
                        '3xl:w-16 3xl:h-16 flex h-12 w-12 flex-shrink-0 select-none items-center justify-center border border-zinc-900 text-black dark:border-zinc-900',
                        color === 'red' && 'text-white',
                        href &&
                          count > 0 &&
                          'cursor-pointer duration-200 hover:opacity-80',
                        count === 0 && 'opacity-70',
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        if (href && count > 0) {
                          router.push(`${href}&score=${score}`);
                        }
                      }}
                    >
                      {count > 0 ? count : ''}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex w-80 flex-col gap-2 text-sm">
                    <p
                      className={cn(
                        'italic',
                        threshold === Thresholds.RED &&
                          'text-red-500 dark:text-red-300',
                        threshold === Thresholds.GREEN &&
                          'text-green-500 dark:text-green-400',
                        threshold === Thresholds.YELLOW &&
                          'text-yellow-600 dark:text-yellow-400',
                      )}
                    >
                      Scoren er {score}
                    </p>
                    <p>
                      • Sandsynlighed er {probability} -{' '}
                      <span className="font-semibold">
                        {ProbabilityDescription[probability]?.toLowerCase()}
                      </span>
                    </p>
                    <p>
                      • Konsekvens er {consequence} -{' '}
                      <span className="font-semibold">
                        {ConsequenceDescription[consequence]?.toLowerCase()}
                      </span>
                    </p>
                    <p>
                      • Der er {count} {count < 1 ? 'risiko' : 'risici'} som har
                      scoren {score}
                    </p>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
        ))}
        <div className="flex flex-shrink-0">
          <div className="w-8"></div>
          {[1, 2, 3, 4, 5].map((consequence) => (
            <HoverCard key={consequence}>
              <HoverCardTrigger className="3xl:w-16 flex h-8 w-12 flex-shrink-0 select-none items-center justify-center text-xs hover:cursor-pointer hover:opacity-70 md:text-sm">
                {consequence}
              </HoverCardTrigger>
              <HoverCardContent className="w-80 gap-2 text-sm">
                <span>Konsekvensen {consequence} beskrives som </span>
                <span className="underline">
                  {ConsequenceDescription[consequence]?.toLowerCase()}
                </span>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
        <em className="ml-8 text-xs md:text-sm">Konsekvens</em>
      </div>
    </div>
  );
}
