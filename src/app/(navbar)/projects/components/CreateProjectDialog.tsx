'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DatePicker } from '@components/ui/DatePickerShadcn';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';
import { type CreateProjectForm } from '@lib/api/types';
import { ProjectRole } from '@models';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface CreateProjectDialogProps {
  myId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function CreateProjectDialog({
  myId,
  isOpen,
  setIsOpen,
  refetch,
}: CreateProjectDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateProjectForm>({
    defaultValues: {
      name: '',
      description: '',
      startDate: new Date(),
      dueDate: undefined,
      assignments: [
        {
          userId: myId,
          role: ProjectRole.MEMBER,
        },
      ],
    },
  });

  async function onSubmit(data: CreateProjectForm) {
    if (dayjs(data.startDate).isAfter(data.dueDate)) {
      toast.error('Startdato kan ikke være efter slutdato');
      return;
    }

    try {
      await axios.post('/api/project', data);
      toast.success('Project created!');
      refetch();
      reset();
      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error('Du har ikke rettigheder til at oprette projekter');
          return;
        }
        toast.error('Noget gik galt -' + error.code);
        return;
      }
      toast.error('Noget gik galt, beklager.');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Opret nyt projekt
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 text-black dark:text-white">
              <div className="flex gap-3">
                <div className="flex w-full flex-col gap-3">
                  <Label>Projekt navn</Label>
                  <Input
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Projekt navn er påkrævet',
                      },
                    })}
                  />
                </div>
                <div className="flex w-full flex-col gap-3">
                  <Label>Projekt beskrivelse</Label>
                  <Input {...register('description')} />
                </div>
                <div className="flex w-1/2 flex-col gap-3">
                  <Label>Budget [kr.]</Label>
                  <Input {...register('budget')} />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="space-y-1">
                  <Label>Start Dato</Label>
                  <DatePicker
                    date={watch('startDate') ?? undefined}
                    setDate={(date: Date | undefined) => {
                      setValue('startDate', date ?? null);
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Slut Dato</Label>
                  <DatePicker
                    date={watch('dueDate') ?? undefined}
                    setDate={(date: Date | undefined) => {
                      setValue('dueDate', date ?? null);
                    }}
                  />
                </div>
                <div className="items-center ">
                  <Label>CSM?</Label>
                  <div className="pb-4 pt-4">
                    <Checkbox className="text-xl" />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={() => setIsOpen(false)}>
                Luk!
              </Button>
              <Button variant="default" type="submit" loading={isSubmitting}>
                Opret
              </Button>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
