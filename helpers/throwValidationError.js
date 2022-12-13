const { WrongRequestError } = require('../errors');

const throwValidationError = (error) => {
  if (error) {
    const message = error.details[0].message.replaceAll('"', "'");
    throw new WrongRequestError(message, 'ValidationError');
  }
};

module.exports = throwValidationError;
