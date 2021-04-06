const { AuthenticationError } = require('apollo-server');

const postResolvers = {
  Query: {
    getPost: async (parent, { id }, { models: { postModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await postModel.findById({ _id: id }).exec();
      return post;
    },
    getPosts: async (parent, args, { models: { postModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const posts = await postModel.find({ author: me.id }).exec();
      return posts;
    },
  },
  Mutation: {
    createPost: async (parent, { content }, { models: { postModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await postModel.create({ content, author: me.id });
      return post;
    },
  },
  Post: {
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    },
  },
};

module.exports = postResolvers;