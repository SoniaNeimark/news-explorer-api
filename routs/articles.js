const express = require('express')

const { articlesCollection, article } = require('../paths/paths')
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles')

const router = express.Router();

router.get(articlesCollection, getArticles)

router.post(articlesCollection, createArticle)

router.delete(article, deleteArticle)

module.exports = router
