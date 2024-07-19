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
      <DialogContent className="bg-[#413e3e]">
        <DialogHeader>
          <DialogTitle className="text-white">Rediger Projekt</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-white">
          <div className="flex w-full items-start gap-5">
            <div>
              <Label>Projekt navn</Label>
              <Input
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
                // label="Projektnavn"
                // variant="bordered"
                // isInvalid={!!errors.name}
                // errorMessage={errors.name?.message}
              />
            </div>
            <div>
              <Label>Projekt beskrivelse</Label>
              <Input
                {...register('description')}
                value={watch('description') ?? ''}
                // label="Beskrivelse"
                // variant="bordered"
              />
            </div>
          </div>
          <div className="mt-5 flex gap-5">
            <div className="flex flex-col">
              <DatePicker
                // customPlaceholder="Vælg start dato"
                date={watch('startDate') ?? undefined}
                setDate={(date: Date | undefined) => {
                  setValue('startDate', date);
                }}
              />
            </div>

            <div className="flex flex-col">
              <DatePicker
                // customPlaceholder="Vælg slut dato"
                date={watch('dueDate') ?? undefined}
                setDate={(date: Date | undefined) => {
                  setValue('dueDate', date);
                }}
              />
            </div>
            <Label>Budget [kr.]</Label>
            <Input
              {...register('budget')}
              value={watch('budget') ?? ''}
              // label="Budget [kr.]"
              // variant="bordered"
              type="number"
            />
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Luk
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>Gem</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
