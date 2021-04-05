const mongoose = require('mongoose');
const { Mongo } = require('@accounts/mongo');
const dotenv = require('dotenv');

dotenv.config();

// Connect mongoose to mongodb database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const accountsMongo = new Mongo(mongoose.connection);

module.exports = accountsMongo;