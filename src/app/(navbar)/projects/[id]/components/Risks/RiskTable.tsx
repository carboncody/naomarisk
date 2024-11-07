'use client';

import { Button } from '@components/ui/button';
import { DataTable } from '@components/ui/data-table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@components/ui/sheet';
import { type Project, type Risk } from '@models';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaComment } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );
  const [filteredData, setFilteredData] = useState<Risk[]>(risks);

  const [customOrder, setCustomOrder] = useState<number[]>([]);
  const [savedOrder, setSavedOrder] = useState<number[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    const initialOrder = risks.map((risk) => risk.customId);
    setCustomOrder(initialOrder);

    const storedOrder = localStorage.getItem('savedOrder');
    if (storedOrder) {
      setSavedOrder(JSON.parse(storedOrder) as number[]);
    }
  }, [risks]);

  useEffect(() => {
    if (selectedEmployeeId) {
      setFilteredData(
        risks.filter((risk) => risk.riskowner?.id === selectedEmployeeId),
      );
    } else {
      setFilteredData(risks);
    }
  }, [risks, selectedEmployeeId]);

  const toggleCustomOrder = () => {
    if (savedOrder) {
      setSavedOrder(null);
      localStorage.removeItem('savedOrder');
    } else {
      setSavedOrder([...customOrder]);
      localStorage.setItem('savedOrder', JSON.stringify(customOrder));
    }
  };

  const clearEmployeeFilter = () => {
    setFilteredData(risks);
    setSelectedEmployeeId(null);
  };

  const rows = filteredData
    .map((risk) => ({
      ...risk,
      riskScore:
        risk.probability && risk.consequence
          ? risk.probability * risk.consequence
          : 0,
    }))
    .sort((a, b) => {
      const order = savedOrder ?? customOrder;
      return order.indexOf(a.customId) - order.indexOf(b.customId);
    });

  const handleRowClick = (risk: Risk) => {
    router.push(`/projects/${project.id}/risk/${risk.id}`);
  };

  const handleEdit = (risk: Risk) => {
    setRiskBeingEdited(risk);
  };

  const handleDelete = (risk: Risk) => {
    setRiskBeingDeleted(risk);
  };

  const handleOpenSheet = (risk: Risk) => {
    setSelectedRisk(risk);
    setIsSheetOpen(true);
  };

  const searchParams = useSearchParams();
  const employeeName = searchParams.get('employee');

  return (
    <>
      <Button className="mb-3" onClick={toggleCustomOrder}>
        {savedOrder ? 'Ryd sortering' : 'Gem sortering'}
      </Button>
      {selectedEmployeeId && (
        <div className="my-2 flex w-full justify-end">
          <div className="flex items-center">
            <div className="rounded-l-lg border border-r-0 border-zinc-400 bg-gray-200 px-2 font-light text-black dark:border-transparent dark:bg-zinc-700 dark:text-white">
              <span className="text-zinc-500 dark:text-zinc-400">
                Filtrering for
              </span>{' '}
              {employeeName}
            </div>
            <div
              onClick={clearEmployeeFilter}
              className="border-l-dashed flex h-full items-center justify-center rounded-r-lg border border-dashed border-black bg-gray-200 px-2 font-light text-black duration-200 hover:cursor-pointer hover:text-red-500 dark:border-zinc-500 dark:bg-zinc-700 dark:text-white dark:hover:text-red-400"
            >
              <RxCross2 />
            </div>
          </div>
        </div>
      )}

      <DataTable
        columns={columns({
          handleEdit,
          handleDelete,
          handleOpenSheet,
          project,
          router,
          filterByEmployee: setSelectedEmployeeId,
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
