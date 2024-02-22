import { GraphQLClient } from 'graphql-request';

const isClient = typeof window !== 'undefined';

export const graphQLClient = new GraphQLClient(
  'http://localhost:8000/graphql',
  {
    headers: () => ({
      Authorization: isClient
        ? `Bearer ${
            JSON.parse(window.localStorage.getItem('token') as string)
              .verifyGoogleToken
          }`
        : '',
    }),
  },
);
