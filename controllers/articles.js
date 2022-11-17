const { celebrate, Joi, CelebrateError, isCelebrateError } = require('celebrate');
const Article = require('../models/article');
const {
  NotFoundError,
  ServerError,
  NotArticleOwnerError,
} = require('../helpers/errors');
const BadRequestError = require('../helpers/BadRequestError')

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(NotFoundError)
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const item = { ...req.body, owner: req.user._id }
  //item.owner = req.user._id
  Article.create(item)
    .then((article) => {
      if (article.owner) {
        res.send(`${article} '${article.title}' added to collection ${article.owner}`);
        return;
      }
      throw ServerError;
    })
    .catch((err) => {
      if (isCelebrateError(err)) {
       next(new BadRequestError("oops"))
      } else {
        next(err)
      }
    });
    //res.send(item)
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .select('+owner')
    .orFail(NotFoundError)
    .then((article) => {
      if (`${article.owner}` !== `${req.user._id}`) {
        throw NotArticleOwnerError;
      }
      Article.findByIdAndDelete(article._id)
        .orFail(NotFoundError)
        .then((removedItem) => res.send({ message: `${removedItem.title} deleted` }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
