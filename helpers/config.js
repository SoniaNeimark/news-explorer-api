require('dotenv').config();

const {
  NODE_ENV,
  DB_URI,
  PORT,
  JWT_SECRET,
} = process.env;
const dbUri = NODE_ENV === 'production' ? DB_URI : 'mongodb://localhost:27017/devdb';
const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const port = NODE_ENV === 'production' ? PORT : 3000;

module.exports = {
  dbUri,
  secret,
  port,
};
