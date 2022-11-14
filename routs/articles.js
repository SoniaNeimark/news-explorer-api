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

router.get(articlesCollection, validateRequest(headersValidation), getArticles);

router.post(
  articlesCollection,
  validateRequest({ ...headersValidation, ...articleBodyValidation }),
  createArticle
);

router.delete(article, validateRequest({ ...headersValidation, ...paramsValidation }), deleteArticle);

module.exports = router;
