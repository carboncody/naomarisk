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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useEmployees } from '@lib/api/hooks';
import { type UpdateRiskForm } from '@lib/api/types/risk';
import { RiskStatus, type Project, type Risk, type User } from '@models';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { EditRiskOverview } from './EditRiskOverview'; // Import the new component
import { EditRiskProperties } from './EditRiskProperties'; // Import the new component

interface EditRiskProps {
  isOpen: boolean;
  project: Project;
  setRiskBeingEdited: (risk: Risk | null) => void;
  refetch: () => void;
  riskElement: Risk;
}

export function EditRisk({
  riskElement,
  setRiskBeingEdited,
  project,
  refetch,
  isOpen,
}: EditRiskProps) {
  const methods = useForm<UpdateRiskForm>({
    defaultValues: {
      description: riskElement.description,
      probability: riskElement.probability ?? null,
      consequence: riskElement.consequence ?? null,
      status: riskElement.status,
      activity: riskElement.activity,
      riskOwnerUserId: riskElement.riskOwnerUserId,
      timeProbability: riskElement.timeProbability ?? null,
      timeConsequence: riskElement.timeConsequence ?? null,
      economicConsequence: riskElement.economicConsequence ?? null,
      economicProbability: riskElement.economicProbability ?? null,
      mitigationPhaseId: riskElement.mitigationPhaseId,
      projectPhaseId: riskElement.projectPhaseId,
    },
  });

  const { handleSubmit } = methods;

  const StatusDropdownOptions: { label: string; value: RiskStatus }[] = [
    { label: 'Open', value: RiskStatus.Open },
    { label: 'Closed', value: RiskStatus.Closed },
  ];

  async function onSubmit(data: UpdateRiskForm) {
    const {
      probability,
      consequence,
      timeConsequence,
      timeProbability,
      economicConsequence,
      economicProbability,
    } = data;

    data.probability = probability ? +probability : null;
    data.consequence = consequence ? +consequence : null;
    data.timeConsequence = timeConsequence ? +timeConsequence : null;
    data.timeProbability = timeProbability ? +timeProbability : null;
    data.economicConsequence = economicConsequence
      ? +economicConsequence
      : null;
    data.economicProbability = economicProbability
      ? +economicProbability
      : null;

    try {
      await axios.patch(`/api/risk/${riskElement.id}`, data);
      toast.success('Risk updated successfully!');
      refetch();
      setRiskBeingEdited(null);
    } catch (error) {
      toast.error('Error - something went wrong');
    }
  }

  const { data: allEmployees, isError } = useEmployees();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'properties'>(
    'overview',
  );

  const projectMembers: User[] | undefined = useMemo(() => {
    const projectMemberIds = project.projectUsers.map((pu) => pu.userId);
    return allEmployees?.filter((employee) =>
      projectMemberIds.includes(employee.id),
    );
  }, [allEmployees, project.projectUsers]);

  if (isError || !allEmployees) {
    return <div>Something went wrong</div>;
  }

  return (
    <FormProvider {...methods}>
      <Tabs
        value={selectedTab}
        onValueChange={(tab) =>
          setSelectedTab(tab as 'overview' | 'properties')
        }
        className="mb-5"
      >
        <Dialog open={isOpen} onOpenChange={() => setRiskBeingEdited(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex justify-between pr-4 text-black dark:text-white">
                Rediger Risiko
                <TabsList>
                  <TabsTrigger value="overview">Oversigt</TabsTrigger>
                  <TabsTrigger value="properties">Egenskaber</TabsTrigger>
                </TabsList>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-black dark:text-white">
              <TabsContent value="overview">
                <EditRiskOverview
                  projectMembers={projectMembers}
                  StatusDropdownOptions={StatusDropdownOptions}
                />
              </TabsContent>
              <TabsContent value="properties">
                <EditRiskProperties project={project} />
              </TabsContent>
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => setRiskBeingEdited(null)}
              >
                Luk
              </Button>
              <Button variant="default" onClick={handleSubmit(onSubmit)}>
                Gem
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Tabs>
    </FormProvider>
  );
}