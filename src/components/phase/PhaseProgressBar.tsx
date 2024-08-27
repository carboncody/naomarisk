import { HoverCard, HoverCardTrigger } from '@components/ui/hover-card';
import { HoverCardContent } from '@radix-ui/react-hover-card';
import 'src/components/ui/styles.css';

interface PhaseProgressBarProps {
  riskPhase: number;
  mitigatingPhase: number;
}

export function PhaseProgressBar({
  riskPhase,
  mitigatingPhase,
}: PhaseProgressBarProps) {
  const totalPhases = 5;

  const phaseLabels = [
    'Definition',
    'Program',
    'Projektering',
    'Udførelse',
    'Afslutning',
  ];

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div>
          <div className="flex gap-1 rounded-md">
            {Array.from({ length: totalPhases }, (_, index) => {
              let bgColor = 'bg-zinc-300 dark:bg-zinc-500 border'; 

              if (index < riskPhase) {
                bgColor = 'bg-blue-400 dark:bg-blue-500'; 
              } else if (index < mitigatingPhase) {
                bgColor = 'bg-white dark:bg-zinc-200 border'; 
              }

              return (
                <div
                  key={index}
                  className={`h-5 w-5 rounded-md ${bgColor}`}
                ></div>
              );
            })}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="bg-white dark:bg-zinc-800 p-3 rounded-md shadow-md">
          <div>
            <strong>Risiko fase:</strong> <span className="text-blue-500 dark:text-blue-400">{phaseLabels[riskPhase - 1]}</span>
          </div>
          <div>
            <strong>Mitigerende fase:</strong> <span>{phaseLabels[mitigatingPhase - 1]}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
