import { type Project } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useProject(projectId: string) {
  const queryInfo = useQuery<Project, Error>({
    queryKey: ['project-' + projectId],
    queryFn: async (): Promise<Project> => {
      const { data } = await axios.get<Project>(`/api/project/${projectId}`);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
