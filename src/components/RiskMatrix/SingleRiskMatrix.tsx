import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@components/ui/hover-card';
import { ColorMap, RiskMap, Thresholds } from '@lib/calc/threshholds';
import clsx from 'clsx';
import { IoIosWarning } from 'react-icons/io';
import {
  ConsequenceDescription,
  ProbabilityDescription,
} from './RiskMatrixDescription';

interface SingleRiskMatrixProps {
  probability: number | null;
  consequence: number | null;
  onCellClick?: ({
    probability,
    consequence,
  }: {
    probability: number;
    consequence: number;
  }) => void;
}

export function SingleRiskMatrix({
  probability,
  consequence,
  onCellClick,
}: SingleRiskMatrixProps) {
  const matrix: boolean[][] = Array.from({ length: 5 }, () =>
    Array<boolean>(5).fill(false),
  );

  if (probability && consequence) {
    if (matrix[5 - probability]) {
      matrix[5 - probability]![consequence - 1] = true;
    }
  }

  return (
    <div className="flex -translate-x-6 items-center dark:text-zinc-300">
      <em className="translate-x-8 rotate-[270deg] text-xs md:text-sm">
        Sandsynlighed
      </em>
      <div className="flex flex-col items-center">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            <div className="mr-4 flex w-2 flex-shrink-0 select-none items-center justify-center text-xs md:text-sm">
              {5 - rowIndex}
            </div>
            {row.map((hasDot, colIndex) => {
              const currentProbability = 5 - rowIndex;
              const currentConsequence = colIndex + 1;
              const score = currentProbability * currentConsequence;
              const threshold = RiskMap[score];
              const color = threshold ? ColorMap[threshold] : 'green';
              const showWarning =
                currentProbability === probability &&
                currentConsequence === consequence;

              return (
                <HoverCard key={`${rowIndex}-${colIndex}`}>
                  <HoverCardTrigger>
                    <div
                      className={clsx(
                        '3xl:w-16 3xl:h-16 flex h-12 w-12 flex-shrink-0 select-none items-center justify-center border border-zinc-900 text-black',
                        onCellClick && 'cursor-pointer',
                        color === 'red' && 'text-white',
                        !showWarning && 'opacity-70',
                      )}
                      style={{ backgroundColor: color }}
                    >
                      {showWarning && (
                        <IoIosWarning className="h-6 w-6 text-black" />
                      )}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="flex w-80 flex-col gap-2 text-sm">
                    <p
                      className={clsx(
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
                      • Sandsynlighed er {5 - rowIndex} -{' '}
                      <span className="font-semibold">
                        {ProbabilityDescription[5 - rowIndex]?.toLowerCase()}
                      </span>
                    </p>
                    <p>
                      • Konsekvens er {colIndex + 1} -{' '}
                      <span className="font-semibold">
                        {ConsequenceDescription[colIndex + 1]?.toLowerCase()}
                      </span>
                    </p>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
        ))}
        <div className="flex flex-shrink-0">
          <div className="w-8"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="3xl:w-16 flex h-8 w-12 flex-shrink-0 select-none items-center justify-center text-xs md:text-sm"
            >
              {i}
            </div>
          ))}
        </div>
        <em className="ml-8 text-xs md:text-sm">Konsekvens</em>
      </div>
    </div>
  );
}
