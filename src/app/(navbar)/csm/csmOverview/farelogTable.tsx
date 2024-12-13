'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';

export function farelogTable() {
  return (
    <div className="flex w-full flex-col rounded-md p-3 dark:bg-zinc-900">
      <Table>
        <TableHeader className="border-b ">
          <TableRow>
            <TableHead
              className="w-[100px] bg-blue-300 font-bold text-black dark:bg-blue-500 dark:text-white"
              colSpan={6}
            >
              Fare ID
            </TableHead>
            <TableHead
              colSpan={4}
              className="bg-orange-300 font-bold text-black dark:bg-orange-500 dark:text-white"
            >
              Farebeskrivelse
            </TableHead>
            <TableHead
              colSpan={4}
              className="bg-red-300 font-bold text-black dark:bg-red-500 dark:text-white"
            >
              Fareklassifikation
            </TableHead>
            <TableHead
              colSpan={4}
              className="bg-purple-300 font-bold text-black dark:bg-purple-500 dark:text-white"
            >
              Systemreference
            </TableHead>
            <TableHead
              colSpan={2}
              className="bg-green-200 font-bold text-black dark:bg-green-400 dark:text-white"
            >
              Risikoaccepteretprincip
            </TableHead>
            <TableHead
              colSpan={4}
              className="bg-green-300 font-bold text-black dark:bg-green-500 dark:text-white"
            >
              Risiko-reducerende tiltag
            </TableHead>
            <TableHead
              colSpan={1}
              className="bg-yellow-300 font-bold text-black dark:bg-yellow-500 dark:text-white"
            >
              Risikoevaluering
            </TableHead>
            <TableHead
              colSpan={3}
              className="bg-zinc-300 font-bold text-black dark:bg-zinc-500 dark:text-white"
            >
              Stadie/Tillæg
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead>ID nr.</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Identificeret</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Dato for revision</TableHead>
            <TableHead className="border-r dark:border-zinc-600">
              Ansvarlig for faren
            </TableHead>
            <TableHead>Fare (Uønsket Tilstand)</TableHead>
            <TableHead>Årsag til Faren</TableHead>
            <TableHead>Bagvedliggende Årsag(er) til faren</TableHead>
            <TableHead className="border-r dark:border-zinc-600">
              Kommentarer
            </TableHead>
            <TableHead>Ulykke Kategori</TableHead>
            <TableHead>Person Kategori</TableHead>
            <TableHead>Konsekvens</TableHead>
            <TableHead className="border-r dark:border-zinc-600">
              Acceptkriterie før tiltag
            </TableHead>
            <TableHead>Fag</TableHead>
            <TableHead>Ændringstype</TableHead>
            <TableHead>Aktivitet i projektet</TableHead>
            <TableHead className="border-r dark:border-zinc-600">
              Hvornår gennemføres aktiviteten{' '}
            </TableHead>
            <TableHead>CSM-RA Risikoaccepteretprincip</TableHead>
            <TableHead className="border-r dark:border-zinc-600">
              Referencer til risikoaccepteretprincip
            </TableHead>
            <TableHead>Beskrivelse af risiko-reducerende tiltag</TableHead>
            <TableHead>Kommentarer til risiko reducerende tiltag</TableHead>
            <TableHead>
              Dokumentation for opfyldelse af sikkerhedskrav
            </TableHead>
            <TableHead className="border-r dark:border-zinc-600">
              Status tiltag
            </TableHead>
            <TableHead className="border-r dark:border-zinc-600">
              Risiko niveau (efter besluttet risikoreduc. titlag)
            </TableHead>
            <TableHead>Tillæg 1.1</TableHead>
            <TableHead>Tillæg 1.2</TableHead>
            <TableHead>Tillæg 1.3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>Åben</TableCell>
            <TableCell>03-09-2024</TableCell>
            <TableCell>2</TableCell>
            <TableCell>01-12-2024</TableCell>
            <TableCell className="border-r dark:border-zinc-600">
              Projektleder
            </TableCell>
            <TableCell>Overgravet Kabel</TableCell>
            <TableCell>Eksisterende ledning gravet over/ødelagt</TableCell>
            <TableCell>
              1. Afvandingsledninger ødelagt i.f.m. gravearbejder.
              <br />
              2. 400V kabel ødelagt i.f.m. gravearbejder.
            </TableCell>
            <TableCell className="border-r dark:border-zinc-600">
              Afspærring
            </TableCell>
            <TableCell>Afsporing</TableCell>
            <TableCell>Passager</TableCell>
            <TableCell>Flere dræbte</TableCell>
            <TableCell className="border-r dark:border-zinc-600">
              Uacceptabel
            </TableCell>
            <TableCell>Spor</TableCell>
            <TableCell>Etablering af spor</TableCell>
            <TableCell></TableCell>
            <TableCell className="border-r dark:border-zinc-600">
              Udførelse
            </TableCell>
            <TableCell>Reference System</TableCell>
            <TableCell className="border-r dark:border-zinc-600">
              BN1-8-1 <br /> BN1-6-6 <br /> BN1-38-5 <br /> BN1-66-2 <br /> DSB
              fritrumsprofiler <br /> BN1-18-2 <br /> GAB Spor
            </TableCell>
            <TableCell>
              - Kontrolaktiviteter iht. Udbudskontrolplan Spor. <br />-
              Entreprenørens interne kvalitetskontrol. <br />- Dokumentation for
              udførelse
            </TableCell>
            <TableCell>
              Krav til dokumentation if. Udbudskontrolplan spor, dok nr.
              XXXXXX_UKP_SPO
            </TableCell>
            <TableCell>Afsluttet behandling</TableCell>
            <TableCell className="border-r dark:border-zinc-600">
              Acceptabelt
            </TableCell>
            <TableCell className="border-r dark:border-zinc-600"></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
