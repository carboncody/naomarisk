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
import { type Project, type Risk } from '@models';
import toast from 'react-hot-toast';

interface DeleteRiskProps {
  project: Project;
  isOpen: boolean;
  setRiskBeingDeleted: (risk: Risk | null) => void;
  refetch: () => void;
}

export function DeleteRisk({ isOpen, setRiskBeingDeleted }: DeleteRiskProps) {
  const handleDelete = async () => {
    console.log('delete');
    toast.success('Risiko er slettet');
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setRiskBeingDeleted(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            Slet Risk
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-black dark:text-white">
          Er du sikker på, at du vil slette denne risiko? Denne handling kan
          ikke fortrydes.
        </DialogDescription>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setRiskBeingDeleted(null)}>
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
