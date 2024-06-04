import { type Project } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useAllProjects() {
  const queryInfo = useQuery<Project[], Error>({
    queryKey: ['all-projects'],
    queryFn: async (): Promise<Project[]> => {
      const { data } = await axios.get<Project[]>('/api/project');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
