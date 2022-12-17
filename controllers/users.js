const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
const { secret } = require('../helpers/config');
const {
  ConflictError,
  NotFoundError,
  ServerError,
  userExists,
  notFound,
  serverErr,
} = require('../errors');
const WrongRequestError = require('../errors/WrongRequestError');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(notFound))
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, password, email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(userExists);
      }
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create({
            email,
            password: hash,
            name,
          })
            .then(() => {
              res.send({ name, email });
            })
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new WrongRequestError('Invalid data'));
              } else {
                next(err);
              }
            });
        })
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
