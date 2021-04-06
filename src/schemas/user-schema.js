import { gql } from 'apollo-server';

// Extend the account-js user model to include posts
const userTypeDefs = gql`
  extend type User {
    """
    A full list of posts created by the user
    """
    posts: [Post!]!
  }
`;

export default userTypeDefs;