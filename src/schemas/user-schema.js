const { gql } = require('apollo-server');

const userTypeDefs = gql`
  type User {
    """
    A full list of posts created by the user
    """
    posts: [Post!]!
  }
`;

module.exports = userTypeDefs;