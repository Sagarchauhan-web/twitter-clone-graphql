import { graphQLClient } from '@/clients/api';
import { getCurrentUserQuery, getUserByIdQuery } from '@/graphql/query/user';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUser = () => {
  const query = useQuery<any>({
    queryKey: ['currentUser'],
    queryFn: () => graphQLClient.request(getCurrentUserQuery),
  });

  return { ...query, user: query.data?.getCurrentUser };
};

export const useGetUserById = (id: string) => {
  const query = useQuery<any>({
    queryKey: ['user', id],
    queryFn: () => graphQLClient.request(getUserByIdQuery, { id }),
  });

  return { ...query, user: query.data?.getUserById };
};
