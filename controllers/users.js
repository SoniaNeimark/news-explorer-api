const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  NotFoundError,
  AlreadyExistsError,
  ServerError,
} = require('../helpers/errors');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(NotFoundError)
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw AlreadyExistsError;
      }
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          User.create({
            email: req.body.email,
            password: hash,
            name: req.body.name,
          })
            .then((newItem) => {
              if (newItem.password) {
                const { password, ...itemToReturn } = newItem._doc;
                if (password) {
                  res.send(itemToReturn);
                }
                throw ServerError;
              }
              throw ServerError;
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        }
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
