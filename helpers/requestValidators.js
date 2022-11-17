const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const string = Joi.string().required().min(2);
const url = Joi.string().required().custom(validateURL);
const password = Joi.string().required().min(8);
const email = Joi.string().email().required();
const id = Joi.string().alphanum().length(24);

//  headers
const headersObjKeys = {
  authorization: Joi.string()
    .required()
    .regex(/(Bearer)\s{1}[.\w\d]*/),
};

const headersValidation = {
  headers: Joi.object().keys(headersObjKeys).unknown(true),
};

//  params
const paramsObjKeys = {
  id,
};

const paramsValidation = {
  params: Joi.object().keys(paramsObjKeys),
};

//  user body
const userBodyObjKeys = {
  email,
  password,
  name: string,
};

const userBodyValidation = {
  body: Joi.object().keys(userBodyObjKeys),
};

//  userCredentials body
const userCredentialsBodyObjKeys = {
  email,
  password,
};

const userCredentialsBodyValidation = {
  body: Joi.object().keys(userCredentialsBodyObjKeys),
};

//  article body
const articleBodyObjKeys = {
  keyword: string,
  title: string,
  text: string,
  date: string,
  source: string,
  link: url,
  image: url,
};

const articleBodyValidation = {
  body: Joi.object().keys(articleBodyObjKeys),
};

const validateRequest = (validationObj) => celebrate(validationObj);

module.exports = {
  headersValidation,
  paramsValidation,
  userBodyValidation,
  userCredentialsBodyValidation,
  articleBodyValidation,
  validateRequest,
};
