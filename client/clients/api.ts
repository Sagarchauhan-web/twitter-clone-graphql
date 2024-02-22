import { GraphQLClient } from 'graphql-request';

const isClient = typeof window !== 'undefined';

const token =
  isClient && window.localStorage.getItem('token')
    ? `Bearer ${
        JSON.parse(window.localStorage.getItem('token') as string)
          .verifyGoogleToken
      }`
    : '';

console.log(isClient && window.localStorage.getItem('token'));

export const graphQLClient = new GraphQLClient(
  'http://localhost:8000/graphql',
  {
    headers: () => ({
      Authorization: token,
    }),
  },
);
