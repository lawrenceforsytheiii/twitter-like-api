const mongoose = require('mongoose');
const { Mongo } = require('@accounts/mongo');

// Connect mongoose to local mongodb database
mongoose.connect('mongodb://localhost:27017/twitter-like-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const accountsMongo = new Mongo(mongoose.connection);

module.exports = accountsMongo;