import { AccountsServer } from '@accounts/server';
import { AccountsPassword } from '@accounts/password';
import { AccountsModule } from '@accounts/graphql-api';
import dotenv from 'dotenv';
import accountsMongo from './db-config';

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

export default accountsGraphQL;
