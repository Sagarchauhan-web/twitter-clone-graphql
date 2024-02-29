import { graphQLClient } from '@/clients/api';
import { createTweetMutation } from '@/graphql/mutations/tweet';
import { getAllTweetsQuery } from '@/graphql/query/tweet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useGetAllTweets = () => {
  const query = useQuery<any>({
    queryKey: ['all-tweets'],
    queryFn: async () => {
      console.log(await graphQLClient.request(getAllTweetsQuery), 'hsdfhh');
      return graphQLClient.request(getAllTweetsQuery);
    },
  });

  return { ...query, tweets: query.data?.getAllTweets };
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: { content: string }) =>
      graphQLClient.request(createTweetMutation, { payload }),

    onMutate: (payload) => toast.loading('Creating Tweet', { id: '1' }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['all-tweets'] });
      toast.success('Created Successfully', { id: '1' });
      return;
    },
  });

  return mutation;
};
