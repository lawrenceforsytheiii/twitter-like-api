const mongoose = require('mongoose');

// Extend the account-js user model to include posts
const userSchema = new mongoose.Schema({
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
});

const user = mongoose.model('user', userSchema);

module.exports = user;