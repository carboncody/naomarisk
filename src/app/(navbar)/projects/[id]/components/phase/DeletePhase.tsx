'use client';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { type Phase, type Project } from '@models';
import axios from 'axios';
import toast from 'react-hot-toast';

interface DeletePhaseProps {
  refetch: () => void;
  phaseElement: Phase;
  project: Project;
  isOpen: boolean;
  setPhaseBeingDeleted: (phase: Phase | null) => void;
}

export function DeletePhase({
  setPhaseBeingDeleted,
  phaseElement,
  refetch,
  isOpen,
}: DeletePhaseProps) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/phase/${phaseElement.id}`);
      console.log(phaseElement.id);
      toast.success('Phase Deleted successfully!');
      refetch();
      setPhaseBeingDeleted(null);
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setPhaseBeingDeleted(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Slet Fase
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black dark:text-white">
          Er du sikker på, at du vil slette denne Fase? Denne handling kan ikke
          fortrydes.
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setPhaseBeingDeleted(null)}
          >
            Annuller
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Slet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
