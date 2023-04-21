require('dotenv').config();

const {
  NODE_ENV,
  DB_URI,
  PORT,
  JWT_SECRET,
} = process.env;
const dbUri = NODE_ENV === 'production' ? 'https://eu-central-1.aws.data.mongodb-api.com/app/data-ppkzz/endpoint/data/v1' : 'mongodb://localhost:27017/devdb';
const secret = NODE_ENV === 'production' ? 'dev-secret' : 'dev-secret';
const port = NODE_ENV === 'production' ? PORT : 3000;

module.exports = {
  dbUri,
  secret,
  port,
};
