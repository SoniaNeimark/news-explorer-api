const throwValidationError = require('../helpers/throwValidationError');

const validate = (validator) => (req, res, next) => {
  const { error } = validator(req.body);
  throwValidationError(error);
  next();
};

const validateParams = (validator) => (req, res, next) => {
  const { error } = validator(req.params);
  throwValidationError(error);
  next();
};

module.exports = { validate, validateParams };
