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
import { type CreatePhaseForm } from '@lib/api/types'; // Ensure you have a type for CreatePhaseForm
import { type Project } from '@models';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface CreatePhaseProps {
  isOpen: boolean;
  project: Project;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function CreatePhase({
  setIsOpen,
  refetch,
  isOpen,
  project,
}: CreatePhaseProps) {
  const { register, handleSubmit, watch, setValue } = useForm<CreatePhaseForm>({
    defaultValues: {
      name: '',
      startDate: undefined,
      endDate: undefined,
      description: '',
    },
  });

  async function onSubmit(data: CreatePhaseForm) {
    try {
      console.log('ProjetID:', project.id);
      console.log('data:', data);
      await axios.post(`/api/phase/${project.id}`, data);
      toast.success('Phase created successfully!');
      refetch();
      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.error(
          'An error occurred while creating a unique ID for the phase. Please try again.',
        );
        return;
      }
      toast.error('Error - something went wrong!');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Opret fase
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black dark:text-white">
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-5">
              <div className="w-full">
                <Label htmlFor="name">Fase Navn</Label>
                <Input
                  className="mt-2 w-full"
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'Phase name is required',
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
                <Label>Start dato</Label>
                <DatePicker
                  date={watch('startDate') ?? undefined}
                  setDate={(date: Date | undefined) => {
                    setValue('startDate', date ?? undefined);
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label>Slut dato</Label>
                <DatePicker
                  date={watch('endDate') ?? undefined}
                  setDate={(date: Date | undefined) => {
                    setValue('endDate', date ?? undefined);
                  }}
                />
              </div>
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Fortryd
          </Button>
          <Button variant="default" onClick={handleSubmit(onSubmit)}>
            Opret
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
