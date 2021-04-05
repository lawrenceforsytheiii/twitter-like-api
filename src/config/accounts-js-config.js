const { AccountsServer } = require('@accounts/server');
const { AccountsPassword } = require('@accounts/password');
const { AccountsModule } = require('@accounts/graphql-api');
const accountsMongo = require('./db-config');

const accountsPassword = new AccountsPassword({});

const accountsServer = new AccountsServer(
  {
    db: accountsMongo,
    // Replace this value with a strong secret
    tokenSecret: 'my-super-random-secret',
  },
  {
    password: accountsPassword,
  }
);

// Generate the accounts-js GraphQL module
const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

module.exports = accountsGraphQL;