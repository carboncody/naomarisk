'use client';

import { ScoreDropdown } from '@/components/ui/dropdowns/ScoreDropdown';
import { SingleDropdown } from '@components/ui';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import { Input } from '@components/ui/Input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { type UpdateRiskForm } from '@lib/api/types/risk';
import { ProjectStatus, type RiskStatus, type User } from '@models';
import axios from 'axios';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditRiskOverviewProps {
  projectMembers: User[] | undefined;
  statusDropdownOptions: { label: string; value: RiskStatus }[];
  riskId: string;
  refetch: () => void;
}

export function EditRiskOverview({
  projectMembers,
  statusDropdownOptions,
  riskId,
  refetch,
}: EditRiskOverviewProps) {
  const { register, setValue, watch } = useFormContext<UpdateRiskForm>();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [pendingChange, setPendingChange] = useState<{
    field: 'probability' | 'consequence';
    value: number | null;
  } | null>(null);

  function handleImportantChange(
    field: 'probability' | 'consequence',
    value: number | null,
  ) {
    setPendingChange({ field, value });
    setCommentText(
      (field === 'probability' ? 'Sandynlighed' : 'Konsekvens') +
        ' bliver ændret til ' +
        value +
        '. Begrundelse - ',
    );
    setIsAlertOpen(true);
  }

  async function handleConfirmChange() {
    if (pendingChange && commentText.trim()) {
      try {
        await axios.post(`/api/comment/risk/${riskId}`, {
          content: commentText,
        });
        setValue(pendingChange.field, pendingChange.value);
        refetch();
        setIsAlertOpen(false);
        setCommentText('');
        setPendingChange(null);
      } catch (error) {
        toast.error('Der opstod en fejl ved tilføjelse af kommentar');
      }
    }
  }

  const handleCancelChange = () => {
    setIsAlertOpen(false);
    setCommentText('');
    setPendingChange(null);
  };


  console.info('watchRiskManagerUserId: ', watch('riskManagerUserId'));
  console.info('riskOwnerUserId: ', watch('riskOwnerUserId'));

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
              type="probability"
              label="Vælg Sansynlighed"
              selectedValue={watch('probability') ?? null}
              onSelect={(value) => handleImportantChange('probability', value)}
            />
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <Label htmlFor="consequence">Konsekvens</Label>
            <ScoreDropdown
              type="consequence"
              label="Vælg Konsekvens"
              selectedValue={watch('consequence') ?? null}
              onSelect={(value) => handleImportantChange('consequence', value)}
            />
          </div>
        </div>
        <div className="flex w-full items-start gap-5">
          <div className="flex w-full flex-col items-start gap-2">
            <span>Status</span>
            <SingleDropdown
              options={statusDropdownOptions}
              buttonLabel={
                statusDropdownOptions.find(
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
          <div className="flex w-full flex-col items-start gap-2">
            <span>Risko Manager</span>
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
                projectMembers && watch('riskManagerUserId')
                  ? projectMembers.find(
                      (employee) => employee.id === watch('riskManagerUserId'),
                    )?.email ?? 'Vælg risiko manager'
                  : 'Vælg risiko manager'
              }
              selectedValue={watch('riskManagerUserId') ?? null}
              setSelectedValue={(value) => setValue('riskManagerUserId', value)}
            />
          </div>
        </div>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kommentar påkrævet</AlertDialogTitle>
            <AlertDialogDescription>
              Du er ved at ændre en vigtig værdi. Tilføj venligst en kommentar
              for at forklare denne ændring.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Skriv din kommentar her..."
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelChange}>
              Annuller
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmChange}
              disabled={!commentText.trim()}
            >
              Bekræft
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
