import { sortBy } from '@components/Table/sorting/sort.utils';
import { ColorMap, RiskMap } from '@lib/calc/threshholds';
import type { Project, Risk } from '@models';
import { Accordion, AccordionItem } from '@nextui-org/react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import { BiSort } from 'react-icons/bi';
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
} from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import EditRisk from '../EditRisk';

interface RiskTableProps {
  risks: Risk[];
  refetch: () => void;
  project: Project;
}

export function RiskTable({ risks, project, refetch }: RiskTableProps) {
  const [sortedRisks, setSortedRisks] = useState(risks);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [riskBeingEdited, setRiskBeingEdited] = useState<Risk | null>(null);

  function renderSortIcon(column: string) {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />;
    }
    return <BiSort />;
  }

  function renderNumericSortIcon(column: string) {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? (
        <FaSortNumericDown />
      ) : (
        <FaSortNumericUp />
      );
    }
    return <BiSort />;
  }

  function handleSortBy(column: string) {
    let sorted;
    if (sortColumn === column) {
      sorted = [...sortedRisks].reverse();
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      switch (column) {
        case 'id':
          sorted = [...risks].sort((a, b) =>
            sortBy('number')(a.customId, b.customId),
          );
          break;
        case 'ejer':
          sorted = [...risks].sort((a, b) =>
            sortBy('string')(getRiskOwner(a), getRiskOwner(b)),
          );
          break;
        case 'risiko':
          sorted = [...risks].sort((a, b) =>
            sortBy('number')(getRiskValue(a), getRiskValue(b)),
          );
          break;
        default:
          sorted = risks;
      }
      setSortColumn(column);
      setSortDirection('asc');
    }
    setSortedRisks(sorted);
  }

  function getRiskOwner(risk: Risk): string {
    return risk.riskowner
      ? risk.riskowner.fullName ?? risk.riskowner.email
      : 'Ingen ejer';
  }

  function getRiskValue(risk: Risk): number {
    return risk.probability * risk.consequence || 0;
  }

  function getStyleColor(risk: Risk): string | undefined {
    const riskValue = risk.probability * risk.consequence;
    const threshold = RiskMap[riskValue];
    if (threshold === undefined) {
      return undefined;
    }
    return ColorMap[threshold];
  }

  return (
    <>
      <div className="grid w-full grid-cols-8 gap-4 rounded-lg bg-[#d4d4d8] text-black">
        <div
          className="col-span-4 flex items-center gap-2 rounded-lg p-4 duration-150 hover:cursor-pointer hover:bg-[#b3b3b8]"
          onClick={() => handleSortBy('id')}
        >
          Risk-ID - Beskrivelse
          {renderSortIcon('id')}
        </div>
        <div
          className="col-span-1 flex items-center gap-2 rounded-lg p-4 duration-150 hover:cursor-pointer hover:bg-[#b3b3b8]"
          onClick={() => handleSortBy('ejer')}
        >
          Ejer
          {renderSortIcon('ejer')}
        </div>
        <div
          className="col-span-2 flex items-center gap-2 rounded-lg p-4 duration-150 hover:cursor-pointer hover:bg-[#b3b3b8]"
          onClick={() => handleSortBy('risiko')}
        >
          Risiko
          {renderNumericSortIcon('risiko')}
        </div>
      </div>
      <Accordion className="text-sm">
        {sortedRisks.map((risk) => (
          <AccordionItem
            className="w-full rounded-lg bg-[#424242] hover:bg-[#333333] "
            key={risk.id}
            title={
              <div className="grid w-full grid-cols-8 gap-4 rounded-lg border-b border-gray-600 text-white last:border-0 ">
                <div
                  className="col-span-4 flex truncate px-2"
                  title={risk.description}
                >
                  <span>{risk.customId}</span> -
                  <span className="truncate">{risk.description}</span>
                </div>
                <div
                  className="col-span-1 truncate px-2"
                  title={risk.description}
                >
                  <span>
                    {risk.riskowner ? (
                      risk.riskowner.fullName ?? risk.riskowner.email
                    ) : (
                      <em className="text-gray-400">Ingen ejer</em>
                    )}
                  </span>
                </div>
                <div
                  className="col-span-2 truncate px-2"
                  title={risk.description}
                >
                  <div
                    style={{
                      color: getStyleColor(risk),
                    }}
                    className={clsx('flex items-center gap-2')}
                  >
                    <div>
                      <p>Sansynlighed :</p>
                      <p>Konsekvens :</p>
                    </div>
                    <div>
                      <p>
                        {risk.probability ?? (
                          <em className="text-gray-400">Ikke defineret</em>
                        )}
                      </p>
                      <p>
                        {risk.consequence ?? (
                          <em className="text-gray-400">Ikke defineret</em>
                        )}
                      </p>
                    </div>
                    <em>
                      {'->'} {risk.probability * risk.consequence}
                    </em>
                  </div>
                </div>
                <button
                  className="flex w-16 items-center  justify-center rounded-lg"
                  onClick={(risk) => console.log(risk)}
                >
                  <MdOutlineEdit />
                </button>
              </div>
            }
          >
            <div className="grid grid-cols-4 gap-4 px-4 pb-3">
              <p className="col-span-1">
                Oprettet: {dayjs(risk.createdAt).format('DD MMM YYYY')}
              </p>
              <p className="col-span-1">
                Senest Opdateret: {dayjs(risk.updatedAt).format('DD MMM YYYY')}
              </p>
              {<p className="col-span-1">Kommentar: {risk.comment}</p>}
              {<p className="col-span-1">Aktivitet: {risk.activity}</p>}
            </div>
          </AccordionItem>
        ))}
      </Accordion>

      {riskBeingEdited && (
        <EditRisk
          isOpen={!!riskBeingEdited}
          riskElement={riskBeingEdited}
          setRiskBeingEdited={setRiskBeingEdited}
          project={project}
          refetch={refetch}
        />
      )}
    </>
  );
}
