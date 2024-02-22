import { graphQLClient } from '@/clients/api';
import { getCurrentUserQuery } from '@/graphql/query/user';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUser = () => {
  const query = useQuery<any>({
    queryKey: ['currentUser'],
    queryFn: () => graphQLClient.request(getCurrentUserQuery),
  });

  return { ...query, user: query.data?.getCurrentUser };
};
