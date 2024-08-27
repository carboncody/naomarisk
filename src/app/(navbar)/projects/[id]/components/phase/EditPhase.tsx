import { type Phase } from '@models';
import 'src/components/ui/styles.css';
import { PhaseDropdown } from './PhaseDropdown';

interface EditPhaseprops {
  phases: Phase[];
}

export function EditPhase({ phases }: EditPhaseprops) {
  return (
    <div className="w-full rounded-md border p-5 dark:border-zinc-800">
      <div className="flex gap-5">
        <div className="w-full">
          <div className=" mb-4 rounded-md bg-zinc-200 p-3 dark:bg-zinc-800">
            Projektfase for risiko
          </div>
          <div>
            <PhaseDropdown />
          </div>
        </div>
        <div className="w-full">
          <div className=" mb-4 rounded-md bg-zinc-200 p-3 dark:bg-zinc-800">
            Mitigerende projektfase for risiko
          </div>
          <div className="w-full">
            <PhaseDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}
