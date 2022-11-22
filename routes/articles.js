const express = require('express');

const { articlesCollection, article } = require('../paths/paths');
const { validate, validateParams } = require('../middlewares/validate');
const { validateArticle, articleParams } = require('../models/article');
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const router = express.Router();

router.get(articlesCollection, getArticles);

router.post(articlesCollection, validate(validateArticle), createArticle);

router.delete(article, validateParams(articleParams), deleteArticle);

module.exports = router;
