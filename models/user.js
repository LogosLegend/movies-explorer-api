const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Unauthorized = require('../errors/Unauthorized');

const {

  errorCodeMessage401,

} = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    toObject: {
      useProjection: true,
    },

    toJSON: {
      useProjection: true,
    },

    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email }).select('+password')
          .then((user) => {
            if (!user) {
              return Promise.reject(new Unauthorized(errorCodeMessage401));
            }

            return bcrypt.compare(password, user.password)
              .then((matched) => {
                if (!matched) {
                  return Promise.reject(new Unauthorized(errorCodeMessage401));
                }

                return user;
              });
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
