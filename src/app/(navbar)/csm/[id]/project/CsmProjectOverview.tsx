import { RiskPieChart } from '@app/(navbar)/projects/[id]/components/RiskPieChart';
import { SingleDropdown } from '@components/ui';
import { Button } from '@components/ui/button';
import { ProjectRole, type Project, type ProjectStatus } from '@models';
import toast from 'react-hot-toast';

interface CsmProjectOverviewProps {
  statusOptions: { label: string; value: ProjectStatus }[];
  onSubmit: (data: { status: ProjectStatus }) => void;
  setIsEditOpen: (isEditOpen: boolean) => void;
  project: Project;
}

export function CsmProjectOverview({
  statusOptions,
  setIsEditOpen,
  project,
  onSubmit,
}: CsmProjectOverviewProps) {
  return (
    <div className="flex w-full gap-4">
      <div className="sticky top-12 h-fit w-full rounded-md p-4 md:top-20">
        <Button
          variant="secondary"
          className="my-4 w-32 justify-end"
          onClick={() => toast.error('funktion under udvikling')}
        >
          Rediger Projekt
        </Button>
        <div className="flex gap-2">
          <div className="w-2/6 rounded-lg border bg-white p-6 shadow dark:border-transparent dark:bg-zinc-800 dark:text-white ">
            <h2 className="mb-4 text-2xl font-bold">Dokument Information</h2>
            <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
              <span className="text-lg font-semibold">Dokument nr.:</span>
              <p className="w-3/5 text-base font-light">123</p>
            </div>
            <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
              <span className="text-lg font-semibold">Versionsnr.:</span>
              <p className="w-3/5 text-base font-light">0.1</p>
            </div>
            <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
              <span className="text-lg font-semibold">Gyldighedsdato:</span>
              <p className="w-3/5 text-base font-light">21 januar 2023</p>
            </div>
            <div className="mt-10 flex items-center justify-between border-b py-2 dark:border-zinc-700">
              <span className="text-lg font-semibold">Udarbejdet af:</span>
              <p className="w-3/5 text-base font-light">John Doe</p>
            </div>
            <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
              <span className="text-lg font-semibold">Gransket af:</span>
              <p className="w-3/5 text-base font-light">John Doe</p>
            </div>
            <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
              <span className="text-lg font-semibold">Godkendt af:</span>
              <p className="w-3/5 text-base font-light">John Doe</p>
            </div>
          </div>
          <div className="w-4/6 rounded-lg border bg-white p-6 shadow dark:border-transparent dark:bg-zinc-800 dark:text-white ">
            <h2 className="mb-4 text-2xl font-bold">Projekt Information</h2>

            <div className="overflow-x-auto">
              <div className="w-full">
                <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                  <span className="text-lg font-semibold">Projektnavn</span>
                  <p className="w-3/5 text-base font-light">{project.name}</p>
                </div>
                <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                  <span className="text-lg font-semibold">Beskrivelse</span>
                  <p className="w-3/5 text-base font-light">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                  <span className="mr-2 text-lg font-semibold">
                    Projektleder
                  </span>
                  <div className="flex w-3/5 flex-col items-start justify-start">
                    <p className="w-full text-base font-light">
                      {project.projectUsers.find(
                        (projectUser) =>
                          projectUser.role === ProjectRole.MANAGER,
                      )?.user.fullName ?? 'Ingen leder'}
                    </p>
                    <p className="flex flex-row text-xs text-muted-foreground">
                      {(project.projectUsers.find(
                        (projectUser) =>
                          projectUser.role === ProjectRole.MANAGER,
                      )?.user.contact?.phone ??
                        'Intet telefonnummer tilgængeligt') +
                        ' | ' +
                        (project.projectUsers.find(
                          (projectUser) =>
                            projectUser.role === ProjectRole.MANAGER,
                        )?.user.email ?? 'Ingen tilgængelig e-mailadresse')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center border-b py-2 dark:border-zinc-700">
                <span className="w-1/5 text-lg font-semibold">
                  Status for projektet
                </span>
                <p className="w-32 text-base font-light">
                  <SingleDropdown
                    triggerClassName="w-32"
                    options={statusOptions}
                    buttonLabel={
                      statusOptions.find(
                        (option) => option.value === project.status,
                      )?.label ?? 'Vælg status'
                    }
                    selectedValue={project.status}
                    setSelectedValue={(value) => {
                      if (value) {
                        void onSubmit({
                          status: value as ProjectStatus,
                        });
                      }
                    }}
                  />
                </p>
              </div>
              <div className="mt-5">
                <p className="mt-4 text-xl font-normal">
                  Risici i projektet: {project.risks.length}
                </p>
                <div className="mt-2 flex w-full items-center gap-5">
                  <RiskPieChart project={project} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-lg border bg-white p-6 shadow dark:border-transparent dark:bg-zinc-800 dark:text-white  ">
          <h2 className="mb-4 text-2xl font-bold">
            Ændringslog til fareregister:
          </h2>
        </div>
        {/* <div className="mt-5 flex w-full flex-col gap-4 md:flex-row">
          <div className="flex w-full items-center justify-center gap-20 rounded-xl border shadow dark:border-transparent dark:bg-zinc-800 dark:shadow-none">
            <div>
              <div className="pb-5">
                <p className="font-semibold">Sandsynlighed:</p>
                <div className="mt-2">
                  {[5, 4, 3, 2, 1].map((probability) => (
                    <div key={probability} className="mb-1 flex">
                      <div className="mr-4 flex w-2 flex-shrink-0 select-none items-center justify-center text-xs  md:text-sm">
                        {probability}
                      </div>
                      <div className="w-60 gap-2 text-sm">
                        {ProbabilityDescription[probability]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <p className="font-semibold">Konsekves:</p>
                <div className="mt-2">
                  {[5, 4, 3, 2, 1].map((consequence) => (
                    <div key={consequence} className="mb-1 flex">
                      <div className="mr-4 flex w-2 flex-shrink-0 select-none items-center justify-center text-xs md:text-sm">
                        {consequence}
                      </div>
                      <div className="w-60 gap-2 text-sm">
                        {ConsequenceDescription[consequence]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ProjectRiskMatrix projectId={project.id} risks={project.risks} />
          </div>
          <div className="w-full rounded-xl border shadow dark:border-transparent dark:bg-zinc-800 dark:shadow-none">
            <RiskChart project={project} />
          </div>
        </div> */}
      </div>
    </div>
  );
}
