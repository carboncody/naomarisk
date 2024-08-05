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
import { type UpdateProjectForm } from '@lib/api/types';
import { type Project } from '@models';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface EditProjectProps {
  isOpen: boolean;
  project: Project;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function EditProject({
  isOpen,
  setIsOpen,
  project,
  refetch,
}: EditProjectProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateProjectForm>({
    defaultValues: {
      name: project.name ?? '',
      startDate: project.startDate ?? new Date(),
      dueDate: project.dueDate ?? undefined,
      budget: project.budget ?? '0',
      description: project.description ?? '',
    },
  });

  async function onSubmit(data: UpdateProjectForm) {
    try {
      await axios.patch(`/api/project/${project.id}`, data);
      toast.success('Projektet er opdateret!');
      refetch();
      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error('Du har ikke rettigheder til at ændre projekter');
          return;
        }
        toast.error('Noget gik galt -' + error.code);
        return;
      }
      toast.error('Noget gik galt, beklager.');
    }
  }

  console.info(watch());

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Rediger Projekt</DialogTitle>
        </DialogHeader>
        <DialogDescription className="dark:text-white">
          <div className="flex w-full items-start gap-5 text-black dark:text-white">
            <div>
              <Label>Projekt navn</Label>
              <Input
                className="mt-2 w-full"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Navn er påkrævet',
                  },
                  minLength: {
                    value: 3,
                    message: 'Navn skal være mindst 3 tegn',
                  },
                })}
                value={watch('name') ?? ''}
              />
            </div>
            <div>
              <Label>Projekt beskrivelse</Label>
              <Input
                className="mt-2 w-full"
                {...register('description')}
                value={watch('description') ?? ''}
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2">Budget [kr.]</Label>
              <Input
                className="w-full"
                {...register('budget')}
                value={watch('budget') ?? ''}
                type="number"
              />
            </div>
          </div>
          <div className="mt-5 flex gap-5">
            <div className="flex flex-col">
              <Label className="mb-2">Startdato</Label>
              <DatePicker
                date={watch('startDate') ?? undefined}
                setDate={(date: Date | undefined) => {
                  setValue('startDate', date);
                }}
              />
            </div>

            <div className="flex flex-col">
              <Label className="mb-2">Slutdato</Label>
              <DatePicker
                date={watch('dueDate') ?? undefined}
                setDate={(date: Date | undefined) => {
                  setValue('dueDate', date);
                }}
              />
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Luk
          </Button>
          <Button variant="default" onClick={handleSubmit(onSubmit)}>
            Gem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
