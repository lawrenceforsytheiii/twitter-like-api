# twitter-like-api
A minimal twitter-like GraphQL API with authentication/user management, post creation/retrieval, and mongodb storage support

## GraphQL API Schema
```graphql
directive @auth on FIELD_DEFINITION | OBJECT

type User {
  id: ID!
  emails: [EmailRecord!]
  username: String

  # A full list of posts created by the user
  posts: [Post!]!
}

type EmailRecord {
  address: String
  verified: Boolean
}

type Tokens {
  refreshToken: String
  accessToken: String
}

type LoginResult {
  sessionId: String
  tokens: Tokens
  user: User
}

type CreateUserResult {
  userId: ID
  loginResult: LoginResult
}

type TwoFactorSecretKey {
  ascii: String
  base32: String
  hex: String
  qr_code_ascii: String
  qr_code_hex: String
  qr_code_base32: String
  google_auth_qr: String
  otpauth_url: String
}

input TwoFactorSecretKeyInput {
  ascii: String
  base32: String
  hex: String
  qr_code_ascii: String
  qr_code_hex: String
  qr_code_base32: String
  google_auth_qr: String
  otpauth_url: String
}

input CreateUserInput {
  username: String
  email: String
  password: String
}

type Query {
  twoFactorSecret: TwoFactorSecretKey
  getUser: User

  # Query to retrieve a post given the id of the post
  getPost(id: ID!): Post!

  # Query to retrieve all posts sent by the authenticated user
  getPosts: [Post!]!
}

type Mutation {
  createUser(user: CreateUserInput!): CreateUserResult
  verifyEmail(token: String!): Boolean
  resetPassword(token: String!, newPassword: String!): LoginResult
  sendVerificationEmail(email: String!): Boolean
  sendResetPasswordEmail(email: String!): Boolean
  addEmail(newEmail: String!): Boolean
  changePassword(oldPassword: String!, newPassword: String!): Boolean
  twoFactorSet(secret: TwoFactorSecretKeyInput!, code: String!): Boolean
  twoFactorUnset(code: String!): Boolean
  impersonate(
    accessToken: String!
    impersonated: ImpersonationUserIdentityInput!
  ): ImpersonateReturn
  refreshTokens(accessToken: String!, refreshToken: String!): LoginResult
  logout: Boolean
  authenticate(
    serviceName: String!
    params: AuthenticateParamsInput!
  ): LoginResult
  verifyAuthentication(
    serviceName: String!
    params: AuthenticateParamsInput!
  ): Boolean

  # Mutation to create a new post from the authenticated user
  createPost(content: String!): Post!
}

type ImpersonateReturn {
  authorized: Boolean
  tokens: Tokens
  user: User
}

input UserInput {
  id: ID
  email: String
  username: String
}

input AuthenticateParamsInput {
  access_token: String
  access_token_secret: String
  provider: String
  password: String
  user: UserInput
  code: String
}

input ImpersonationUserIdentityInput {
  userId: String
  username: String
  email: String
}

type Post {
  # Unique identifier for the post
  id: ID!

  # Content of the post
  content: String!

  # Author of the post
  author: User!
}

```

## Dependencies
* A locally running instance of mongodb

## Usage
1. Clone repository
2. Install dependencies (use `--force` flag to bypass accounts-js dependency tree issue):
    ```sh
    $ npm install --force
    ```
3. Ensure you have a locally running mongodb instance
4. In a new terminal start mongo shell and switch to `twitter-like-api`:
    ```sh
    > mongo
    > use twitter-like-api
    ```
4. Start the nodemon and apollo-server:
    ```sh
    $ npm run dev
    ```
5. Open a browser and go to http://localhost:4000/ (GraphQL Playground)
6. Create a new user in GraphQL Playground:
    ```graphql
    mutation {
        createUser(
            user: { username: "user1234", email: "user1234@user1234.com", password: "password" }
        ){
            userId
            loginResult{
            sessionId
            tokens{
                refreshToken
                accessToken
            }
            user{
                id
                emails{
                address
                verified
                }
                username
            }
            }
        }
    }
    ```
7. Authenticate the user:
    ```graphql
    mutation {
        authenticate(
            serviceName: "password"
            params: {
            user: { email: "user1234@user1234.com" }
            password: "password"
            }
        ) {
            sessionId
            tokens {
            accessToken
            refreshToken
            }
        }
    }
    ```
8. Use Authorization header including Bearer token in all subsequent requests!
9. Create a new post:
    ```graphql
    mutation {
        createPost(
            content: "Some super interesting post!"
        ) {
            id
            content
            author {
            id
            username
            }
        }
    }
    ```
10. Get all posts created by authenticated user:
    ```graphql
    query {
        getPosts {
            id
            content
            author {
            id
            username
            }
        }
    }
    ```


