import { type CsmProject } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useCsmProject(csmProjectId: string) {
  const queryInfo = useQuery<CsmProject, Error>({
    queryKey: ['project-' + csmProjectId],
    queryFn: async (): Promise<CsmProject> => {
      const { data } = await axios.get<CsmProject>(
        `/api/csmProject/${csmProjectId}`,
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
