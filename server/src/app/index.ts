import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
// import cors from 'cors';

export async function initServer() {
  const app = express();

  app.use(bodyParser.json());

  const graphqlServer = new ApolloServer<any>({
    typeDefs: `
    type Query {
        sayHello: String
    }
    `,
    resolvers: {
      Query: {
        sayHello: () => 'hello from GraphQL Server',
      },
    },
  });

  await graphqlServer.start();

  app.use('/graphql', expressMiddleware(graphqlServer));
  return app;
}
