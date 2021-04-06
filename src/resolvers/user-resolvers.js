const userResolvers = {
  User: {
    posts: async ({ id }, args, { models: { postModel } }, info) => {
      const posts = await postModel.find({ author: id }).exec();
      return posts;
    },
  },
};

module.exports = userResolvers;