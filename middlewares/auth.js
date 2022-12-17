const jwt = require('jsonwebtoken');
const { secret } = require('../helpers/config');
const { AuthorizationError, unAuth } = require('../errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError(unAuth);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (e) {
    throw new AuthorizationError(unAuth);
  }
  req.user = payload;
  next();
  /*const payload = jwt.verify(token, secret);
  if (!payload) {
    throw new AuthorizationError(unAuth);
  }
  req.user = payload;
  next();*/
};

module.exports = {
  auth,
};
