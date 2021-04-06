const { gql } = require('apollo-server');

const typeDefs = gql`
  type Post {
    """
    Unique identifier for the post
    """
    id: ID!
    """
    Content of the post
    """
    content: String!
    """
    Author of the post
    """
    author: User!
  }

  type Query {
    """
    Query to retrieve a post given the id of the post
    """
    getPost(id: ID!): Post! @auth
    """
    Query to retrieve all posts sent by the authenticated user
    """
    getPosts: [Post!]! @auth
  }

  type Mutation {
    """
    Mutation to create a new post from the authenticated user
    """
    createPost(content: String!): Post! @auth
  }
`;

module.exports = typeDefs;
