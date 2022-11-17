const invalidCode = 400;
const unauthorizedCode = 401;
const ForbiddenCode = 403;
const notFoundCode = 404;
const userExistsCode = 409;
const serverErrorCode = 500;

class MyCustomError extends Error {
  constructor(message, name, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

//  400
const WrongRequestError = new MyCustomError(
  'Incorrect request',
  'WrongRequestError',
  invalidCode,
);
const InvalidEmailError = new MyCustomError(
  'Not valid email address',
  'InvalidEmailError',
  invalidCode,
);

//  401
const EmailOrPasswordError = new MyCustomError(
  'Incorrect email or password',
  'EmailOrPasswordError',
  unauthorizedCode,
);

const AuthorizationError = new MyCustomError(
  'Authorization required',
  'AuthorizationError',
  unauthorizedCode,
);

//  403
const NotOwnerError = new MyCustomError(
  'You can edit only your personal account',
  'NotOwnerError',
  ForbiddenCode,
);

const NotArticleOwnerError = new MyCustomError(
  'You can remove only articles added by you',
  'NotArticleOwnerError',
  ForbiddenCode,
);

//  404
const NotFoundError = new MyCustomError(
  'Requested resource not found',
  'NotFoundError',
  notFoundCode,
);

//  409
const AlreadyExistsError = new MyCustomError(
  'User already exists',
  'AlreadyExistsError',
  userExistsCode,
);

//  500
const ServerError = new MyCustomError(
  'An error occured on the server',
  'ServerError',
  serverErrorCode,
);

module.exports = {
  WrongRequestError,
  InvalidEmailError,
  EmailOrPasswordError,
  AuthorizationError,
  NotOwnerError,
  NotArticleOwnerError,
  NotFoundError,
  AlreadyExistsError,
  ServerError,
};
