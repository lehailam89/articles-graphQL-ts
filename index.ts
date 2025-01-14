import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as database from './config/database';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const startServer = async () => {
    dotenv.config();
    database.connect();

    const app: express.Application = express();
    const port: number | string = process.env.PORT || 3000;



    //code API GraphQL

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app: app,
        path: '/graphql'
    })

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

startServer();
