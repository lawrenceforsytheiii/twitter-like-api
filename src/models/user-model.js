import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
});

const user = mongoose.model('user', userSchema);

export default user;