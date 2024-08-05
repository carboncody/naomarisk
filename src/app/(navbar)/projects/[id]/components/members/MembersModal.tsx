'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'; // Adjust the import path according to your setup
import { SingleDropdown } from '@components/ui';
import { PlusMinusButton } from '@components/ui/PlusMinusButton';
import { Button } from '@components/ui/button';
import type { UpdateProjectForm } from '@lib/api/types';
import { type User } from '@models';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface MembersModalProps {
  projectId: string;
  isOpen: boolean;
  projectMemberIds: string[];
  employees: User[];
  refetchProject: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export function MembersModal({
  projectId,
  isOpen,
  projectMemberIds,
  employees,
  refetchProject,
  setIsOpen,
}: MembersModalProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { handleSubmit, watch, setValue, getValues } =
    useForm<UpdateProjectForm>({
      defaultValues: {
        projectUserIds: projectMemberIds,
      },
    });

  async function onSubmit(data: UpdateProjectForm) {
    try {
      await axios.patch(`/api/project/${projectId}`, data);
      toast.success('Projektet er opdateret!');
      refetchProject();
      setIsOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast.error('Du har ikke rettigheder til at ændre projekter');
          return;
        }
        toast.error('Noget gik galt - ' + error.code);
        return;
      }
      toast.error('Noget gik galt, beklager.');
    }
  }

  function removeMember(id: string) {
    setValue(
      'projectUserIds',
      getValues('projectUserIds')?.filter((x) => x !== id),
    );
  }

  function addMember(id: string) {
    setValue('projectUserIds', [...(getValues('projectUserIds') ?? []), id]);
    setIsAdding(false);
  }

  const projectMembers: User[] = employees.filter((employee) => {
    return watch('projectUserIds')?.includes(employee.id);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-zinc-200 dark:bg-zinc-700 dark:text-white">
        <DialogHeader>
          <DialogTitle className="dark:text-white">
            Tilføj / Fjern medlemmer
          </DialogTitle>
        </DialogHeader>
        <div className="text-Zinc-300 flex w-full items-center justify-center pr-6">
          <span className="w-full">Medlemmer</span>
          <span className="w-full">Firma rolle</span>
        </div>

        {projectMembers && projectMembers.length > 0 ? (
          projectMembers.map((member, index) => (
            <div
              className="border-1 flex w-full items-center justify-center rounded-xl p-1"
              key={index}
            >
              <div className="w-full">
                <span className="truncate">{member.email}</span>
              </div>
              <div className="w-full">
                <span className="truncate">{member.role}</span>
              </div>
              <div className="text-center">
                <PlusMinusButton
                  type="minus"
                  onClick={() => removeMember(member.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-Zinc-400 w-full p-2 text-center">
            Ingen medlemmer
          </div>
        )}

        {isAdding && (
          <div className="w-full">
            <SingleDropdown
              selectedValue={undefined}
              options={employees
                .filter(
                  (employee) => !watch('projectUserIds')?.includes(employee.id),
                )
                .map((employee) => ({
                  label: employee.email,
                  value: employee.id,
                  href: undefined,
                }))}
              buttonLabel={'Vælg medlem'}
              setSelectedValue={(id: string | undefined) => id && addMember(id)}
            />
          </div>
        )}

        <div className="mr-8 text-center">
          <PlusMinusButton
            type={isAdding ? 'minus' : 'plus'}
            onClick={() => setIsAdding(!isAdding)}
          />
        </div>

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
