'use client';

import { Button } from '@components/ui/button';
import { type CreateProjectForm } from '@lib/api/types';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@components/ui/Input';

interface NewProjectDialogProps {
  myId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export default function NewProjectDialog({
  myId,
  isOpen,
  setIsOpen,
  refetch,
}: NewProjectDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    defaultValues: {
      name: '',
      description: '',
      startDate: new Date(),
      dueDate: undefined,
      projectUserIds: [myId],
    },
  });

  async function onSubmit(data: CreateProjectForm) {
    try {
      await axios.post('/api/project', data);
      toast.success('Project created!');
      refetch();
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
      <DialogContent className="bg-[#413e3e]"  >
        <DialogHeader>
          <DialogTitle className="text-white">Opret nyt projekt</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 text-white">
              <div className="flex gap-3">
                <Input
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'Projekt navn er påkrævet',
                    },
                  })}
                  // label="Projekt navn"
                  // isInvalid={!!errors.name}
                  // errorMessage={errors.name?.message}
                />
                <Input
                  {...register('description')}
                  className="bg-Zinc-500 col-span-2"
                  // label="Projekt beskrivelse"
                  // variant="bordered"
                />
                <Input
                  {...register('budget')}
                 className="bg-Zinc-500 col-span-2"
                  // label="Budget [kr.]"
                  // type="number"
                />
              </div>
              {/* <div className="flex gap-5">
                <DatePicker
                  customPlaceholder="Vælg start dato"
                  date={watch('startDate') ?? null}
                  setDate={(date: Date | null) => {
                    setValue('startDate', date);
                  }}
                />
                <DatePicker
                  customPlaceholder="Vælg slut dato"
                  date={watch('dueDate') ?? null}
                  setDate={(date: Date | null) => {
                    setValue('dueDate', date);
                  }}
                />
              </div> */}
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={() => setIsOpen(false)}>
                Luk
              </Button>
              <Button type="submit">Opret</Button>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
