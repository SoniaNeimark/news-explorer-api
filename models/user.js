const mongoose = require('mongoose');
const { Joi } = require('celebrate');
const stringValidator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthorizationError, badAuth } = require('../errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return stringValidator.isEmail(v);
      },
      message: 'Invalid email value',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError(badAuth);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationError(badAuth);
        }
        return user;
      });
    });
};

const User = mongoose.model('user', userSchema);

const validateUserLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(user);
};

const validateUserRegister = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).required(),
  });
  return schema.validate(user);
};

module.exports = { User, validateUserLogin, validateUserRegister };
