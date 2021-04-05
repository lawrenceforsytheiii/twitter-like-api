const { AccountsServer } = require('@accounts/server');
const { AccountsPassword } = require('@accounts/password');
const { AccountsModule } = require('@accounts/graphql-api');
const dotenv = require('dotenv');
const accountsMongo = require('./db-config');

dotenv.config();

const accountsPassword = new AccountsPassword({});

const accountsServer = new AccountsServer(
  {
    db: accountsMongo,
    tokenSecret: process.env.JWT_SECRET,
  },
  {
    password: accountsPassword,
  }
);

// Generate the accounts-js GraphQL module
const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

module.exports = accountsGraphQL;