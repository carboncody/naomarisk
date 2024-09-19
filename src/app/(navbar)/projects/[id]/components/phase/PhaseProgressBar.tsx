import { HoverCard, HoverCardTrigger } from '@components/ui/hover-card';
import type { Phase } from '@models';
import { HoverCardContent } from '@radix-ui/react-hover-card';
import dayjs from 'dayjs';
import 'src/components/ui/styles.css';

interface PhaseProgressBarProps {
  riskPhaseId: string;
  mitigatingPhaseId: string;
  projectPhases: Phase[];
}

export function PhaseProgressBar({
  riskPhaseId,
  projectPhases,
  mitigatingPhaseId,
}: PhaseProgressBarProps) {
  const sortedProjectPhases = projectPhases.sort(
    (a, b) => dayjs(a.startDate).valueOf() - dayjs(b.startDate).valueOf(),
  );

  const projectPhaseIndex = sortedProjectPhases.findIndex(
    (phase) => phase.id === riskPhaseId,
  );

  const mitigatingPhaseIndex = sortedProjectPhases.findIndex(
    (phase) => phase.id === mitigatingPhaseId,
  );

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div>
          <div className="flex gap-1 rounded-md">
            {Array.from({ length: sortedProjectPhases.length }, (_, index) => {
              let bgColor = 'bg-zinc-300 dark:bg-zinc-500 border';

              if (index < projectPhaseIndex) {
                bgColor = 'bg-blue-400 dark:bg-blue-500';
              } else if (index < mitigatingPhaseIndex) {
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
        <div className="rounded-md bg-white p-3 shadow-md dark:bg-zinc-800">
          <div>
            <strong>Risiko fase:</strong>{' '}
            <span className="text-blue-500 dark:text-blue-400">
              {projectPhases.find((phase) => phase.id === riskPhaseId)?.name}
            </span>
          </div>
          <div>
            <strong>Mitigerende fase:</strong>{' '}
            <span>
              {
                projectPhases.find((phase) => phase.id === mitigatingPhaseId)
                  ?.name
              }
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
