require('dotenv').config();

const {
  NODE_ENV,
  DB_URI,
  PORT,
  JWT_SECRET,
} = process.env;
const dbUri = DB_URI;
const secret = JWT_SECRET;
const port = NODE_ENV === 'production' ? PORT : 3000;

module.exports = {
  dbUri,
  secret,
  port,
};
