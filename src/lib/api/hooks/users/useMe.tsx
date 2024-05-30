import { type User } from '@models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useMe() {
  const queryInfo = useQuery<User, Error>({
    queryKey: ['me'],
    queryFn: async (): Promise<User> => {
      const { data } = await axios.get<User>('/api/user/me');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return queryInfo;
}
