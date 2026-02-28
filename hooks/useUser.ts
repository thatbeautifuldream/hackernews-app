import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/lib/api/hackernews';
import { queryKeys } from '@/lib/api/queryKeys';

export type TUseUserParams = {
  id: string | null;
  enabled?: boolean;
};

export const useUser = ({ id, enabled = true }: TUseUserParams) => {
  return useQuery({
    queryKey: id ? queryKeys.user.detail(id) : ['user', null],
    queryFn: () => fetchUser(id!),
    enabled: enabled && id !== null,
  });
};
