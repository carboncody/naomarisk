import 'src/components/ui/styles.css';
import { PhaseDropdown } from './PhaseDropdown';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditPhaseprops {}

export function EditPhase({}: EditPhaseprops) {
  return (
    <div className="w-full rounded-md border dark:border-zinc-800 p-5">
      <div className="flex gap-5">
        <div className='w-full'>
          <div className=" mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800 p-3">
            Projektfase for risiko
          </div>
          <div>
            <PhaseDropdown />
          </div>
        </div>
        <div className='w-full'>
          <div className=" mb-4 rounded-md bg-zinc-200 dark:bg-zinc-800 p-3">
            Mitigerende projektfase for risiko
          </div>
          <div className='w-full'>
            <PhaseDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}
