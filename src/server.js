const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-toolkit/schema-merging');
const dotenv = require('dotenv');
const accountsGraphQL = require('./config/accounts-js-config');
const userTypeDefs = require('./schemas/user-schema');
const postTypeDefs = require('./schemas/post-schema');
const userResolvers = require('./resolvers/user-resolvers');
const postResolvers = require('./resolvers/post-resolvers');

dotenv.config();

// Stitch our schema together with account-js schema
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([accountsGraphQL.typeDefs, userTypeDefs, postTypeDefs]),
  resolvers: mergeResolvers([accountsGraphQL.resolvers, userResolvers, postResolvers]),
  schemaDirectives: {
    ...accountsGraphQL.schemaDirectives,
  },
});

const server = new ApolloServer({ schema, context: accountsGraphQL.context });

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});