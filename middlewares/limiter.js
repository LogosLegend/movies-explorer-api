const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 100,
  windowMS: 10 * 60 * 1000,
  message: { message: 'Слишком много запросов' },
});

module.exports = limiter;
