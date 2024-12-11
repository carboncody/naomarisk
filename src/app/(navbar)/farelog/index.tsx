'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useState } from 'react';
import { Csmlog } from './csmLog';
import { AllProjects } from './csmProjects/AllProjects';

export function Farelog() {
  const [selectedTab, setSelectedTab] = useState<
    'overview' | 'project' | 'log' | 'phases'
  >('overview');

  // if (isLoading) {
  //   return (
  //     <div className="flex h-[80vh] items-center justify-center">
  //       <LoadingSpinner size={50} />
  //     </div>
  //   );
  // }

  // if (error ?? !me) {
  //   return <Error statusCode={500} title={'Noget gik galt!'} />;
  // }

  return (
    <div>
      <div className="flex justify-center pb-5 text-3xl font-semibold">
        <div>
          Naoma {'  '}
          <span className="text-red-500">F</span>
          areLog
        </div>
      </div>
      <div>
        <div className="flex flex-col  rounded-lg">
          <Tabs
            value={selectedTab}
            onValueChange={(tab) =>
              setSelectedTab(tab as 'project' | 'overview' | 'log')
            }
            className="mb-5"
          >
            <TabsList>
              <TabsTrigger className="w-56" value="project">
                Projekter
              </TabsTrigger>
              <TabsTrigger className="w-56" value="overview">
                Oversigt
              </TabsTrigger>
              <TabsTrigger className="w-56" value="log">
                Log
              </TabsTrigger>
            </TabsList>
            <TabsContent value="project">{AllProjects()}</TabsContent>
            <TabsContent value="log">{Csmlog()}</TabsContent>
            <TabsContent value="overview">
              <div className="h-[300px] w-full rounded-md dark:bg-zinc-900"></div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
