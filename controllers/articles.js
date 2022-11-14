const Article = require('../models/article');
const {
  NotFoundError,
  ServerError,
  NotArticleOwnerError,
} = require('../helpers/errors');

const getArticles = (req, res, next) => {
  Article.find({})
    .orFail(NotFoundError)
    .then((value) => {
      res.send(value);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  Article.create({
    owner: req.user._id,
    ...({ keyword, title, text, date, source, link, image } = req.body),
  })
    .then((article) => {
      if (article.owner) {
        const { owner, ...articleData } = article._doc;
        if (owner) {
          res.send(articleData);
          return;
        }
        throw ServerError;
      }
      throw ServerError;
    })
    .catch(next);
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
        .then((removedItem) =>
          res.send({ message: `${removedItem.title} deleted` })
        )
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
