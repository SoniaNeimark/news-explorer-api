const { Article } = require('../models/article');
const {
  ForbiddenError,
  NotFoundError,
  ServerError,
  notOwner,
  notFound,
  serverErr,
} = require('../errors');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const item = { ...req.body, owner: req.user._id };
  Article.create(item)
    .then((article) => {
      res.send(article);
      return;
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .orFail(new NotFoundError(notFound))
    .then((article) => {
      if (`${article.owner}` !== `${req.user._id}`) {
        throw new ForbiddenError(notOwner);
      }
      Article.findByIdAndDelete(article._id)
        .orFail(new NotFoundError(notFound))
        .then((removedItem) => res.send(removedItem))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
