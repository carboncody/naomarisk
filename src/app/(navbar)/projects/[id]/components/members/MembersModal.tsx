'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SingleDropdown } from '@components/ui';
import { PlusMinusButton } from '@components/ui/PlusMinusButton';
import { Button } from '@components/ui/button';
import type { UpdateProjectForm } from '@lib/api/types';
import { type ProjectAssignmentForm } from '@lib/api/types/project';
import { ProjectRole, type User } from '@models';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface MembersModalProps {
  projectId: string;
  isOpen: boolean;
  assignments: ProjectAssignmentForm[];
  employees: User[];
  refetchProject: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export function MembersModal({
  projectId,
  isOpen,
  assignments,
  employees,
  refetchProject,
  setIsOpen,
}: MembersModalProps) {
  // Define the role mapping
  const roleMapping: { [key in ProjectRole]: string } = {
    [ProjectRole.MANAGER]: 'Projektleder',
    [ProjectRole.MEMBER]: 'Medarbejder',
  };

  const [isAdding, setIsAdding] = useState(false);
  const { handleSubmit, watch, setValue, getValues } =
    useForm<UpdateProjectForm>({
      defaultValues: {
        assignments: assignments.map((ass) => ({
          userId: ass.userId,
          role: ass.role,
        })),
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

  function updateMemberRole(userId: string, role: ProjectRole) {
    setValue(
      'assignments',
      (getValues('assignments') ?? []).map((assignment) =>
        assignment.userId === userId ? { ...assignment, role } : assignment,
      ),
    );
  }

  function removeMember(userId: string) {
    setValue(
      'assignments',
      (getValues('assignments') ?? []).filter(
        (assignment) => assignment.userId !== userId,
      ),
    );
  }

  function addNewMember(userId: string) {
    setValue('assignments', [
      ...(getValues('assignments') ?? []),
      { userId, role: ProjectRole.MEMBER },
    ]);
    setIsAdding(false);
  }

  const assignedUserIds = watch('assignments')?.map((ass) => ass.userId) ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="dark:text-white">
        <DialogHeader>
          <DialogTitle className="dark:text-white">
            Tilføj / Fjern medlemmer
          </DialogTitle>
        </DialogHeader>
        <div className="text-Zinc-300 flex w-full items-center justify-center pr-6">
          <span className="w-full">Medlemmer</span>
          <span className="w-full">Projekt rolle</span>
        </div>

        {(getValues('assignments') ?? []).length > 0 ? (
          (getValues('assignments') ?? []).map((assignment, index) => (
            <div
              className="flex w-full items-center justify-center rounded-xl border p-1"
              key={index}
            >
              <div className="w-full">
                <span className="truncate">
                  {employees.find((emp) => emp.id === assignment.userId)
                    ?.fullName ?? 'Bruger'}
                </span>
              </div>
              <div className="w-full">
                <SingleDropdown
                  selectedValue={assignment.role}
                  options={Object.values(ProjectRole).map((role) => ({
                    label: roleMapping[role],
                    value: role,
                  }))}
                  buttonLabel={roleMapping[assignment.role] || 'Vælg rolle'}
                  setSelectedValue={(role) =>
                    role &&
                    updateMemberRole(assignment.userId, role as ProjectRole)
                  }
                />
              </div>
              <div className="text-center">
                <PlusMinusButton
                  type="minus"
                  onClick={() => removeMember(assignment.userId)}
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
              selectedValue={null}
              options={employees
                .filter((emp) => !assignedUserIds.includes(emp.id))
                .map((emp) => ({
                  label: emp.fullName || emp.email,
                  value: emp.id,
                }))}
              buttonLabel={'Vælg medlem'}
              setSelectedValue={(id) => id && addNewMember(id)}
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
