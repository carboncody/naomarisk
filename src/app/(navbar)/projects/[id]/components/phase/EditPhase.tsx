'use client';

import { DatePicker } from '@components/ui/DatePickerShadcn';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Label } from '@components/ui/label';
import { type UpdatePhaseForm } from '@lib/api/types';
import type { Phase, Project } from '@models';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditPhaseProps {
  isOpen: boolean;
  project: Project;
  setPhaseBeingEdited: (phase: Phase | null) => void;
  refetch: () => void;
  phaseElement: Phase;
}

export default function EditPhase({
  phaseElement,
  setPhaseBeingEdited,
  refetch,

  isOpen,
}: EditPhaseProps) {
  const { register, handleSubmit, watch, setValue } = useForm<UpdatePhaseForm>({
    defaultValues: {
      name: phaseElement.name,
      startDate: phaseElement.startDate,
      endDate: phaseElement.endDate,
      description: phaseElement.description ?? '',
    },
  });

  async function onSubmit(data: UpdatePhaseForm) {
    try {
      await axios.patch(`/api/phase/${phaseElement.id}`, data);
      toast.success('Phase updated successfully!');
      refetch();
      setPhaseBeingEdited(null);
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setPhaseBeingEdited(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Edit Phase
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black dark:text-white">
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-5">
              <div className="w-full">
                <Label htmlFor="description">Fase navn</Label>
                <Input
                  className="mt-2 w-full"
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'name is required',
                    },
                  })}
                  id="name"
                  value={watch('name')}
                />
              </div>
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
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="space-y-1">
                <Label>Start Dato</Label>
                <DatePicker
                  date={watch('startDate') ?? undefined}
                  setDate={(date: Date | undefined) => {
                    setValue('startDate', date ?? undefined);
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label>Slut Dato</Label>
                <DatePicker
                  date={watch('endDate') ?? undefined}
                  setDate={(date: Date | undefined) => {
                    setValue('endDate', date ?? undefined);
                  }}
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-5">
              <div className="flex items-center gap-4"></div>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => setPhaseBeingEdited(null)}
          >
            Close
          </Button>
          <Button variant="default" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
