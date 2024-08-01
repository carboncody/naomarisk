import { ColorMap, RiskMap } from '@lib/calc/threshholds';
import type { Risk } from '@models';
import clsx from 'clsx';
import { IoIosWarning } from 'react-icons/io';

interface SingleRiskMatrixProps {
  risk: Risk;
}

export function SingleRiskMatrix({ risk }: SingleRiskMatrixProps) {
  const matrix: boolean[][] = Array.from({ length: 5 }, () =>
    Array<boolean>(5).fill(false),
  );

  const { probability, consequence } = risk;
  if (probability && consequence) {
    const score = probability * consequence;
    if (RiskMap[score] && matrix[5 - probability]) {
      matrix[5 - probability]![consequence - 1] = true;
    }
  }

  return (
    <div className="text-Zinc-300 flex -translate-x-6 items-center">
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
              const score = (5 - rowIndex) * (colIndex + 1);
              const threshold = RiskMap[score];
              const color = threshold ? ColorMap[threshold] : 'green';
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={clsx(
                    '3xl:w-16 3xl:h-16 border-Zinc-900 flex h-12 w-12 flex-shrink-0 select-none items-center justify-center border text-black',
                    color === 'red' && 'text-white',
                  )}
                  style={{ backgroundColor: color }}
                >
                  {hasDot && (
                    <IoIosWarning className="h-6 w-6 animate-pulse text-black" />
                  )}
                </div>
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
