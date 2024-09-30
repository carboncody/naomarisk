'use client';

import { ScoreDropdown } from '@/components/ui/dropdowns/ScoreDropdown';
import { SingleDropdown } from '@components/ui';
import { Input } from '@components/ui/Input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { type UpdateRiskForm } from '@lib/api/types/risk';
import { ProjectStatus, type RiskStatus, type User } from '@models';
import { useFormContext } from 'react-hook-form';

interface EditRiskOverviewProps {
  projectMembers: User[] | undefined;
  StatusDropdownOptions: { label: string; value: RiskStatus }[];
}

export function EditRiskOverview({
  projectMembers,
  StatusDropdownOptions,
}: EditRiskOverviewProps) {
  const { register, setValue, watch } = useFormContext<UpdateRiskForm>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-5">
        <div className="w-full">
          <Label htmlFor="description">Beskrivelse</Label>
          <Input
            className="mt-2 w-full"
            {...register('description', {
              required: {
                value: true,
                message: 'Description is required',
              },
            })}
            id="description"
            value={watch('description')}
            onChange={(e) => setValue('description', e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full gap-5">
        <div className="w-full">
          <Label htmlFor="activity">Aktivitet</Label>
          <Textarea
            className="mt-2 w-full"
            {...register('activity')}
            id="activity"
            value={watch('activity')}
            onChange={(e) => setValue('activity', e.target.value)}
          />
        </div>
      </div>
      <div className="mt-5 flex w-full flex-col items-center justify-between gap-5">
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col items-start gap-2">
            <Label htmlFor="probability">Sansynlighed</Label>
            <ScoreDropdown
              label="Vælg Sansynlighed"
              selectedValue={watch('probability') ?? null}
              onSelect={(value) => setValue('probability', value)}
            />
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <Label htmlFor="consequence">Konsekvens</Label>
            <ScoreDropdown
              label="Vælg Konsekvens"
              selectedValue={watch('consequence') ?? null}
              onSelect={(value) => setValue('consequence', value)}
            />
          </div>
        </div>
        <div className="flex w-full items-start gap-5">
          <div className="flex w-full flex-col items-start gap-2">
            <span>Status</span>
            <SingleDropdown
              options={StatusDropdownOptions}
              buttonLabel={
                StatusDropdownOptions.find(
                  (option) => option.value === watch('status'),
                )?.label ?? 'Vælg Status'
              }
              selectedValue={watch('status') ?? ProjectStatus.OPEN}
              setSelectedValue={(value) =>
                value && setValue('status', value as RiskStatus)
              }
            />
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <span>Risko Ejer</span>
            <SingleDropdown
              options={
                projectMembers
                  ? projectMembers.map((employee) => ({
                      label: employee.fullName,
                      value: employee.id,
                    }))
                  : []
              }
              buttonLabel={
                projectMembers && watch('riskOwnerUserId')
                  ? projectMembers.find(
                      (employee) => employee.id === watch('riskOwnerUserId'),
                    )?.email ?? 'Vælg risiko ejer'
                  : 'Vælg risiko ejer'
              }
              selectedValue={watch('riskOwnerUserId') ?? null}
              setSelectedValue={(value) => setValue('riskOwnerUserId', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
