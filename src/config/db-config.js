import mongoose from 'mongoose';
import { Mongo } from '@accounts/mongo';
import dotenv from 'dotenv';

dotenv.config();

// Connect mongoose to mongodb database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const accountsMongo = new Mongo(mongoose.connection);

export default accountsMongo;