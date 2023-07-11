const rateLimiter = require('express-rate-limit');

const {

  messageCode429,

} = require('../utils/constants');

const limiter = rateLimiter({
  max: 100,
  windowMS: 10 * 60 * 1000,
  message: { message: messageCode429 },
});

module.exports = limiter;
