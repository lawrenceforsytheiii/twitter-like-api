import { ApolloServer, makeExecutableSchema, } from 'apollo-server';
import { mergeTypeDefs, mergeResolvers } from '@graphql-toolkit/schema-merging';
import dotenv from 'dotenv';
import accountsGraphQL from './config/accounts-js-config';
import userTypeDefs from './schemas/user-schema';
import postTypeDefs from './schemas/post-schema';
import userResolvers from './resolvers/user-resolvers';
import postResolvers from './resolvers/post-resolvers';

// Retreive environment variables
dotenv.config();

// Stitch our schema together with account-js schema
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([accountsGraphQL.typeDefs, userTypeDefs, postTypeDefs]),
  resolvers: mergeResolvers([accountsGraphQL.resolvers, userResolvers, postResolvers]),
  schemaDirectives: {
    ...accountsGraphQL.schemaDirectives,
  },
});

// Create new server instance
const server = new ApolloServer({
  schema,
  context: async (req) => ({
    ...await accountsGraphQL.context(req),
  }),
});

// Initialize server to listen on environment variable PORT or 4000 by default
server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});