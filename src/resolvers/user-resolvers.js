import postModel from '../models/post-model';

const userResolvers = {
  User: {
    posts: async ({ id }, args, context) => {
      const posts = await postModel.find({ author: id }).exec();
      return posts;
    },
  },
};

export default userResolvers;