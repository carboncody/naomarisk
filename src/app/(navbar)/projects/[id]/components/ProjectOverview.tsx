import { SingleDropdown } from '@components/ui';
import { Button } from '@components/ui/button';
import type { Project, ProjectStatus } from '@models';
import dayjs from 'dayjs';
import { ProjectRiskMatrix } from './ProjectRiskMatrix';
import { RiskPieChart } from './RiskPieChart';
import { RiskChart } from './Risks/RiskChart';

interface ProjectOverviewProps {
  statusOptions: { label: string; value: ProjectStatus }[];
  onSubmit: (data: { status: ProjectStatus }) => void;
  setIsEditOpen: (isEditOpen: boolean) => void;
  project: Project;
}

export function ProjectOverview({
  statusOptions,
  setIsEditOpen,
  project,
  onSubmit,
}: ProjectOverviewProps) {
  return (
    <div className="flex w-full gap-4">
      <div className="sticky top-12 h-fit w-full rounded-md p-4 md:top-20">
        <Button
          variant="secondary"
          className="my-4 w-32 justify-end"
          onClick={() => setIsEditOpen(true)}
        >
          Rediger Projekt
        </Button>
        <div className="rounded-lg border bg-white p-6 shadow dark:border-transparent dark:bg-zinc-900 dark:text-white ">
          <h2 className="mb-4 text-2xl font-bold">Projekt Information</h2>

          <div className="overflow-x-auto">
            <div className="w-full">
              {/* Projektnavn */}
              <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                <span className="text-lg font-semibold">Projektnavn</span>
                <p className="w-4/5 text-base font-light">{project.name}</p>
              </div>
              <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                <span className="text-lg font-semibold">Beskrivelse</span>
                <p className="w-4/5 text-base font-light">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                <span className="text-lg font-semibold">Projektleder</span>
                <p className="w-4/5 text-base font-light">
                  {project.projectUsers[0]?.user.fullName}
                </p>
              </div>
              <div className="flex items-center justify-between border-b py-2 dark:border-zinc-700">
                <span className="text-lg font-semibold">
                  Budget for projektet
                </span>
                <p className="w-4/5 text-base font-light">
                  {project.budget} kr.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 dark:border-zinc-700">
                <span className="text-lg font-semibold">
                  Dato for oprettelse
                </span>
                <p className="w-4/5 text-base font-light">
                  {dayjs(project.createdAt).format('DD.MM.YYYY')}
                </p>
              </div>
              <div className="flex items-center justify-between border-b pb-2 dark:border-zinc-700">
                <span className="text-lg font-semibold">
                  Slut dato for projektet
                </span>
                <p className="w-4/5 text-base font-light">
                  {dayjs(project.dueDate).format('DD.MM.YYYY')}
                </p>
              </div>
            </div>
            <div className="flex items-center border-b py-2 dark:border-zinc-700">
              <span className="w-1/5 text-lg font-semibold">
                Status for projektet
              </span>
              <p className="w-32 text-base font-light">
                <SingleDropdown
                  triggerClassName="w-96"
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

        <div className="mt-5 flex w-full flex-col gap-4 md:flex-row">
          <div className="flex w-full items-center justify-center rounded-xl border shadow dark:border-transparent dark:bg-zinc-900 dark:shadow-none">
            <ProjectRiskMatrix projectId={project.id} risks={project.risks} />
          </div>
          <div className="w-full rounded-xl border shadow dark:border-transparent dark:bg-zinc-900 dark:shadow-none">
            <RiskChart project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}