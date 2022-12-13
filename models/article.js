const mongoose = require('mongoose');
const stringValidator = require('validator');
const { Joi } = require('celebrate');

const validateURL = (value, helpers) => {
  if (stringValidator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return stringValidator.isURL(v);
      },
      message: 'Invalid url value',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return stringValidator.isURL(v);
      },
      message: 'Invalid url value',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const Article = mongoose.model('article', articleSchema);

const validateArticle = (article) => {
  const schema = Joi.object({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateURL),
    image: Joi.string().required().custom(validateURL),
  });
  return schema.validate(article);
};

const articleParams = (params) => {
  const schema = Joi.object({
    id: Joi.string().alphanum().length(24).message('Not valid object id value'),
  });
  return schema.validate(params);
};

module.exports = { Article, validateArticle, articleParams };
