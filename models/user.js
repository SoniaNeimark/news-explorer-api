const mongoose = require('mongoose');
const stringValidator = require('validator');
const bcrypt = require('bcryptjs');
const {
  InvalidEmailError,
  EmailOrPasswordError,
} = require('../helpers/errors');

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

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  if (!stringValidator.isEmail(email)) {
    throw InvalidEmailError;
  }
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw EmailOrPasswordError;
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw EmailOrPasswordError;
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
