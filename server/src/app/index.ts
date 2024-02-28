import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { GraphqlContext } from '../interfaces';
import JWTService from '../services/jwt';
import { User } from './user';

export async function initServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  const graphqlServer = new ApolloServer<GraphqlContext>({
    typeDefs: `
    ${User.types}
    type Query {
        ${User.queries}
    }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });

  await graphqlServer.start();

  app.use(
    '/graphql',
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => ({
        user: req.headers.authorization
          ? JWTService.decodeToken(
              req.headers.authorization.split(' ')[1] as string,
            )
          : undefined,
      }),
    }),
  );
  return app;
}
