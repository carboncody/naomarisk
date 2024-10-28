'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog';
import { ProjectStatus, type Project } from '@models';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ArchiveProjectProps {
  refetch: () => void;
  projectElement: Project | null;
  isOpen: boolean;
  setProjectBeingArchived: (project: Project | null) => void;
}

export function ArchiveProject({
  setProjectBeingArchived,
  projectElement,
  refetch,
  isOpen,
}: ArchiveProjectProps) {
  const handleArchive = async () => {
    if (!projectElement) {
      throw new Error('Project not found');
    }

    try {
      await axios.patch(`/api/project/${projectElement.id}`, {
        status: ProjectStatus.ARCHIVED,
      });
      toast.success('Projekt arkiveret!');
      refetch();
      setProjectBeingArchived(null);
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => setProjectBeingArchived(null)}
    >
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Er du helt sikker?</AlertDialogTitle>
          <AlertDialogDescription>
            Dette projektet vil blive arkiveret
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setProjectBeingArchived(null)}>
            Fortryd
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            onClick={handleArchive}
          >
            Arkiver
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
