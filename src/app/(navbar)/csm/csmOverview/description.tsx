'use client';

export function description() {
  return (
    <div className="w-full rounded-md p-4 dark:bg-zinc-900">
      <h1 className="mb-4 text-xl font-bold">
        Beskrivelse af informationer i farelog
      </h1>
      <table className="w-full  text-sm dark:border-gray-700">
        <tbody>
          <tr>
            <td className="rounded-tl-md border-gray-200 bg-blue-300 p-2 font-bold dark:border-gray-700 dark:bg-blue-500">
              Fare ID
            </td>
            <td className="rounded-tr-md bg-blue-300  p-2 font-bold dark:border-gray-700 dark:bg-blue-500">
              Har til formål at identificere og sikre den enkelte fares
              sporbarhed. Det givne index nr er unikt. *Se beskrivelse nedenfor,
              for hvordan ændringer mellem versioner håndteres.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              ID-nr
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Farens nummer i den enkelte ændrings farelog. Når først en fare er
              registreret med nummer i fareloggen, er nummer brugt og selv efter
              en sletning af faren, kan nummeret ikke genbruges.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Status
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              En fare kan kun lukkes, såfremt der ikke udestår flere afdækkende
              eller opfølgende aktiviteter i faren. Når faren lukkes, skifter
              alle registreringer fra rød til grå. Status vælges fra listen i
              farelog.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Identificeret
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Sporbarhed til farens oprindelse, f.eks. et specifikt projekt,
              således at man efterfølgende kan finde dokumentationen for,
              hvorfor faren er medtaget i fareloggen. Kan også være en dato.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Version
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              For hver opdatering af faren, skal faren have et nyt versions nr.
              for at kunne spore antallet af opdateringer.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Dato for revision
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Dato for farens seneste version.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Ansvarlig for faren
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Ansvarlig for håndtering af faren, at procedurer og bilag følges,
              styring af risiko-reducerende tiltag samt valid og fyldestgørende
              dokumentation.
            </td>
          </tr>
          <tr>
            <td className="border-gray-200 bg-orange-300 p-2 font-bold dark:border-gray-700 dark:bg-orange-500">
              Farebeskrivelse
            </td>
            <td className="border-gray-200 bg-orange-300 p-2 font-bold dark:border-gray-700 dark:bg-orange-500">
              Har til formål at beskrive selve faren samt årsagerne til at faren
              kan blive realistisk.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Fare (Uønsket tilstand)
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Benævnelse af en uønsket tilstand, som kan føre til en ulykke med
              konsekvenser, såfremt faren ikke behandles. Beskriv kun faren og
              ikke årsagen til faren.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Årsag til faren
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Beskrivelse af årsagen til at faren kan realiseres. Spørgteknikken
              &quot;hvorfor?&quot; anvendes.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Bagvedliggende årsag(er) til faren
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              En fare realiseres som oftest som følge af en kombination af
              årsager/uhensigtsmæssige hændelser som leder frem til faren. Her
              noteres årsagen til at årsagen til faren realiseres. (Stil endnu
              en gang spørgsmålet hvorfor med henvisning til årsagen til faren).
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Kommentarer
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Såfremt der er specielle forhold som gør sig gældende for at faren
              kan realiseres eller for at forstå forløbet, noteres dette.
              Eksempelvis, regn, sne, vinter, en given aktivitet eller lignende.
            </td>
          </tr>
          <tr>
            <td className="border-gray-200 bg-red-300 p-2 font-bold dark:border-gray-700 dark:bg-red-500">
              Fareklassifikation
            </td>
            <td className="border-gray-200 bg-red-300 p-2 font-bold dark:border-gray-700 dark:bg-red-500">
              Har til formål at klassificere faren.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Ulykke kategori
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Kategorier af ulykkestyper er beskrevet under faneblad
              &quot;Definitioner&quot;. Kategorien vælges fra listen i farelog.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Person kategori
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Personkategorier er beskrevet under faneblad
              &quot;Definitioner&quot;. Kategorien vælges fra listen i farelog.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Konsekvens
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Estimeret værste konsekvens for personkategorien ved en
              realisering af faren. Kategorisering er taget ud fra den fælles
              sikkerhedsmetode for risikoestimering og evaluering (CSM RA).
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Acceptkriterie før tiltag
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Acceptkriterie fra risikoanalysen før risiko-reducerende tiltag.
              Acceptkriterie vælges fra listen i farelog.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 bg-purple-300 p-2 font-bold dark:border-gray-700 dark:bg-purple-500">
              Systemreference
            </td>
            <td className="border border-gray-200 bg-purple-300 p-2  font-bold dark:border-gray-700 dark:bg-purple-500">
              Kategorisering af faren i henhold til det delsystem indenfor
              jernbanen som påvirkes af den enkelte fare. På den måde kan det
              identificeres hvilke dele af jernbanesystemet farens oprindelse
              stammer fra. Faren kan sagtens have grænseflader til flere
              systemer, som ikke fremgår af denne kategorisering.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Fag
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Her noteres det fagområde, der relaterer sig til faren.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Ændringstype
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Her noteres ændringstypen.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Aktivitet i projektet
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Her noteres de aktiviteter i projektet, der relaterer sig til
              faren.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Hvornår gennemføres aktiviteten
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Her angives hvornår aktiviteten gennemføres i projektet. Ved
              ibrugtagningsfarer menes eksempelvis de farer der relaterer sig
              til ibrugtagningen af fx. bomanlæg ved overkørsler.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 bg-green-200 p-2 font-bold dark:border-gray-700 dark:bg-green-400">
              Risikoacceptprincip
            </td>
            <td className="border border-gray-200 bg-green-200 p-2 font-bold dark:border-gray-700 dark:bg-green-400">
              Angivelse af hvilket risikoacceptprincip jf. CSM-RA som kan
              benyttes til håndtering af faren.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              CSM-RA Risikoacceptprincip
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Udover anerkendt praksis, reference system og eksplicit
              risikovurdering er også &quot;stort set acceptabel&quot; indsat
              som risikoacceptprincip. Dette princip er beskrevet i CSM RA.
              (Bemærk at Trafikstyrelsen har opdelt anerkendt praksis i (a) og
              (b). a: TS-godkendte normer/sikkerhedsregler til BDK, som
              infrastrukturforvalter; SODB, SIN, SR, sporregler. b: TS-godkendte
              normer/sikkerhedsregler til en anden infrastrukturforvalter
              (f.eks. Regionstog), relevante dele af TSIer. Regler, som ikke er
              godkendt af TS.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Reference til risikoacceptprincip
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Her beskrives en reference til de normer (anerkendt praksis), til
              de tegninger og lignende (reference system) som ønskes benyttet
              eller til den eksplicite risikovurdering. Referencen skal være så
              præcis, at man uden nærmere viden skal kunne finde den
              risikoreducerende aktivitet, som imødegår den enkelte fare, det
              kan være afsnit nummer eller lignende.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 bg-green-300 p-2 font-bold dark:border-gray-700 dark:bg-green-500">
              Risikoreducerende tiltag
            </td>
            <td className="border border-gray-200 bg-green-300 p-2 font-bold dark:border-gray-700 dark:bg-green-500">
              Her oplistes tiltag til at imødegå faren, således at enten
              frekvens eller konsekvens nedsættes til et niveau som bevirker, at
              faren er på et acceptabelt niveau.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Beskrivelse af risikoreducerende tiltag
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Beskrivelse af tiltag. Såfremt der er tale om anerkendt praksis,
              beskrives tiltag i henhold til denne praksis, eks:
              signalkommission mv. For øvrige beskrives de tiltag som er
              identificeret ved risikovurderinger mv.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Kommentarer til risikoreducerende tiltag
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Eventuelle forhold som gør sig gældende for gennemførelse af
              tiltaget til imødegåelse af den pågældende fare.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Dokumentation for opfyldelse af sikkerhedskrav
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Her oplistes den sikkerhedsdokumentation som dokumenterer
              opfyldelsen af sikkerhedskrav tilhørende den enkelte fare.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Status tiltag
            </td>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Status på tiltaget til imødegåelse af faren. &quot;foreslået&quot;
              betyder at et tiltag er identificeret og anbefalet af eksperter i
              en risikovurdering eller lignende, &quot;besluttet&quot; når
              tiltaget er en del af projekt med ressourcer og planlægning til
              rådighed, &quot;implementeret&quot; når tiltaget er gennemført som
              foreskrevet.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 bg-yellow-300 p-2  font-bold dark:border-gray-700 dark:bg-yellow-500">
              Risikoevaluering
            </td>
            <td className="border border-gray-200 bg-yellow-300 p-2  font-bold dark:border-gray-700 dark:bg-yellow-500">
              Risikoevaluering efter gennemførelse af de risiko-reducerende
              tiltag.
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2 dark:border-gray-700">
              Risiko niveau (Efter besluttet risikoreducerende tiltag)
            </td>
            <td className="rounded-bl-md border border-gray-200 p-2 dark:border-gray-700">
              Acceptkriterie fra risikoanalysen efter risiko-reducerende tiltag.
              Acceptkriterie vælges fra listen i farelog.
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <div className="w-full rounded-md p-4 dark:bg-zinc-900">
          <h1 className="mb-4 text-xl font-bold">
            Beskrivelse af informationer i farelog
          </h1>
          <ul className="list-disc pl-6 text-sm">
            <li>
              <strong>Version:</strong> For hver gang der foretages en ændring i
              en fare noteres dette med nyt versionsnummer (Kolonne B).
            </li>
            <li>
              <strong>Dato for revision:</strong> Datoen for ændringen noteres i
              denne kolonne (Kolonne E).
            </li>
            <li>
              <strong>Slettet tekst:</strong> Hvis ændringen medfører at tekst
              slettes, da markeres den slettede tekst med strikethrough. Ved en
              efterfølgende opdatering vil teksten slettes helt.
            </li>
            <li>
              <strong>Tilføjet tekst:</strong> Tilføjet tekst indsættes og
              versionen for faren opdateres. Erstatter den tilføjede tekst en
              tidligere tekst skal denne tekst håndteres som slettet tekst.
            </li>
            <li>
              <strong>Rød tekst:</strong> Indikerer udestående der er under
              behandling. Det kan være manglende informationer, yderligere
              risikovurderinger osv.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
