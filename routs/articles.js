const express = require('express');

const { articlesCollection, article } = require('../paths/paths');
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const {
  headersValidation,
  paramsValidation,
  articleBodyValidation,
  validateRequest,
} = require('../helpers/requestValidators');

const router = express.Router();

router.get(articlesCollection, getArticles);

router.post(
  articlesCollection,
  validateRequest({ ...articleBodyValidation }),
  createArticle,
);

router.delete(
  article,
  validateRequest({ ...paramsValidation }),
  deleteArticle,
);

module.exports = router;
