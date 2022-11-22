const messages = require('./errorMessages');
const AuthorizationError = require('./AuthorizationError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const ServerError = require('./ServerError');
const WrongRequestError = require('./WrongRequestError');

module.exports = {
  AuthorizationError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  WrongRequestError,
  ...messages,
};
