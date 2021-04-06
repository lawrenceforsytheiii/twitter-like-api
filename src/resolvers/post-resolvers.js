import postModel from '../models/post-model';
import userModel from '../models/user-model';

const postResolvers = {
  Query: {
    getPost: (rootValue, { id }, context) => {
      return postModel.findById({ _id: id }).exec();
    },
    getPosts: (rootValue, args, context) => {
      const { user: { id } } = context;
      return postModel.find({ author: id }).exec();
    },
  },
  Mutation: {
    createPost: (rootValue, { content }, context) => {
      const { user: { id } } = context;
      return postModel.create({ content, author: context.id });
    },
  },
  Post: {
    author: async ({ author }, args, context) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    },
  },
};

export default postResolvers;