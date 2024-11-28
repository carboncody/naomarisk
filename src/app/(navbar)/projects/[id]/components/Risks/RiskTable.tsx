'use client';

import { DataTable } from '@components/ui/data-table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@components/ui/sheet';
import { type Project, type Risk } from '@models';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaComment } from 'react-icons/fa6';
import { Comments } from '../../risk/[rid]/components/comments';
import { DeleteRisk } from './DeleteRisk';
import { EditRisk } from './EditRisk';
import { columns } from './colums';

interface RiskTableProps {
  refetch: () => void;
  risks: Risk[];
  project: Project;
}

export function RiskTable({ risks, project, refetch }: RiskTableProps) {
  const [riskBeingEdited, setRiskBeingEdited] = useState<Risk | null>(null);
  const [riskBeingDeleted, setRiskBeingDeleted] = useState<Risk | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const router = useRouter();

  const handleRowClick = (risk: Risk) => {
    router.push(`/projects/${project.id}/risk/${risk.id}`);
  };

  function handleEdit(risk: Risk) {
    setRiskBeingEdited(risk);
  }

  function handleDelete(risk: Risk) {
    setRiskBeingDeleted(risk);
  }

  function handleOpenSheet(risk: Risk) {
    setSelectedRisk(risk);
    setIsSheetOpen(true);
  }

  const rows = risks.map((risk) => ({
    ...risk,
    riskScore:
      risk.probability && risk.consequence
        ? risk.probability * risk.consequence
        : 0,
  }));

  return (
    <>
      <DataTable
        tableId="risks"
        columns={columns({
          handleEdit,
          handleDelete,
          handleOpenSheet,
          project,
        })}
        data={rows}
        onRowClick={handleRowClick}
      />

      {riskBeingDeleted && (
        <DeleteRisk
          isOpen={!!riskBeingDeleted}
          riskElement={riskBeingDeleted}
          setRiskBeingDeleted={setRiskBeingDeleted}
          project={project}
          refetch={refetch}
        />
      )}

      {riskBeingEdited && (
        <EditRisk
          isOpen={!!riskBeingEdited}
          riskElement={riskBeingEdited}
          setRiskBeingEdited={setRiskBeingEdited}
          project={project}
          refetch={refetch}
        />
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[600px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3">
              <FaComment className="h-4 w-4" />
              <span>Kommentar</span>
            </SheetTitle>
            <p className="text-sm">Tilføj en ny kommentar her.</p>
            <SheetDescription>
              <Comments
                riskId={selectedRisk?.id ?? ''}
                comments={selectedRisk?.comments ?? []}
                refetch={refetch}
              />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
