require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../helpers/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw AuthorizationError;
  }

  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(
    token,
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  );
  if (!payload) {
    throw AuthorizationError;
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};