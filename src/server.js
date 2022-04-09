import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from "http"
import cors from "cors";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import schema from "./graphql/graphql-schema";

import dotenv from "dotenv";
dotenv.config();

const graphQlPath = process.env.GRAPHQL_PATH;
const port = process.env.PORT;
const dbUrl = process.env.MONGODB_URL


mongoose.connect(dbUrl, {
  autoIndex: true,
}).then(() => {
  console.log("connected to mongodb")
}).catch((e) => {
  console.log(e);
})

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};


async function startApolloServer() {

  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    graphQlPath,
    cors({
      origin: '*'
    }),
    bodyParser.json()
  )

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
    playground: true, 
  });
  await server.start();

  server.applyMiddleware({ app, path: '/' });
  await new Promise(resolve => httpServer.listen({ port }, resolve));
  
  console.log(`Server started at http://localhost:${port}/${graphQlPath}`)
  return { server, app}

}

startApolloServer()
