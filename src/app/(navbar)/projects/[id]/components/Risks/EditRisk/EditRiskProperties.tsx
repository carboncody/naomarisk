'use client';

import { ScoreDropdown } from '@/components/ui/dropdowns/ScoreDropdown';
import { SingleDropdown } from '@components/ui';
import { Label } from '@components/ui/label';
import { type UpdateRiskForm } from '@lib/api/types/risk';
import { type Project } from '@models';
import { useFormContext } from 'react-hook-form';

interface EditRiskPropertiesProps {
  project: Project;
}

export function EditRiskProperties({ project }: EditRiskPropertiesProps) {
  const { setValue, watch } = useFormContext<UpdateRiskForm>();

  return (
    <div>
      <div className="flex w-full items-center gap-5">
        <div className="flex w-full flex-col items-start gap-2">
          <span>Fase</span>
          <SingleDropdown
            options={project.phases.map((phase) => ({
              label: phase.name,
              value: phase.id,
            }))}
            buttonLabel={'Vælg fase'}
            selectedValue={watch('projectPhaseId') ?? null}
            setSelectedValue={(value) => setValue('projectPhaseId', value)}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-2">
          <span>Mitigrerende Fase</span>
          <SingleDropdown
            options={project.phases.map((phase) => ({
              label: phase.name,
              value: phase.id,
            }))}
            buttonLabel={'Vælg mitigrerende Fase'}
            selectedValue={watch('mitigationPhaseId') ?? null}
            setSelectedValue={(value) => setValue('mitigationPhaseId', value)}
          />
        </div>
      </div>
      <h1 className="mt-8 border-spacing-5 border-b-2 border-zinc-300 text-xl font-semibold dark:border-zinc-300">
        Tid
      </h1>
      <div className="mt-4 flex gap-4">
        <div className="w-full">
          <Label htmlFor="timeProbability">
            Sansynlighed i forhold til tid
          </Label>
          <div className="mt-2">
            <ScoreDropdown
              label="Vælg Sansynlighed"
              selectedValue={watch('timeProbability') ?? null}
              onSelect={(value) => setValue('timeProbability', value)}
            />
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="timeConsequence">Konsekvens i forhold til tid</Label>
          <div className="mt-2">
            <ScoreDropdown
              label="Vælg Sansynlighed"
              selectedValue={watch('timeConsequence') ?? null}
              onSelect={(value) => setValue('timeConsequence', value)}
            />
          </div>
        </div>
      </div>
      <h1 className="mt-8 border-spacing-5 border-b-2 border-black text-xl font-semibold dark:border-white">
        Økonomi
      </h1>
      <div className="mt-4 flex gap-4">
        <div className="w-full">
          <Label htmlFor="economicProbability">Økonomisk Sansynlighed</Label>
          <div className="mt-2">
            <ScoreDropdown
              label="Vælg Sansynlighed"
              selectedValue={watch('economicProbability') ?? null}
              onSelect={(value) => setValue('economicProbability', value)}
            />
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="economicConsequence">Økonomisk Konsekvens</Label>
          <div className="mt-2">
            <ScoreDropdown
              label="Vælg Sansynlighed"
              selectedValue={watch('economicConsequence') ?? null}
              onSelect={(value) => setValue('economicConsequence', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
