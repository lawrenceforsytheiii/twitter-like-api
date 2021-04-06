const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-toolkit/schema-merging');
const dotenv = require('dotenv');
const typeDefs = require('./schemas/post-schema');
const accountsGraphQL = require('./config/accounts-js-config');
const resolvers = require('./resolvers/post-resolvers');

dotenv.config();

// Stitch our schema together with account-js schema
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
  resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
  schemaDirectives: {
    ...accountsGraphQL.schemaDirectives,
  },
});

const server = new ApolloServer({ schema, context: accountsGraphQL.context });

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});