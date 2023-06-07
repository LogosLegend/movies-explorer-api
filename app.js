require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { login, createUser, exit } = require('./controllers/users');
const { errorHandler } = require('./middlewares/errorHandler');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');

const { errorCodeUrlMessage404 } = require('./utils/constants');

const auth = require('./middlewares/auth');

const { PORT = 3000, DATABASE = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();

app.use(cors({
  origin: [
    'http://saul.nomoredomains.rocks',
    'https://saul.nomoredomains.rocks',
    'http://api.saul.nomoredomains.rocks',
    'https://api.saul.nomoredomains.rocks',
    'http://localhost:3000',
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
  method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(cookieParser());

mongoose.connect(DATABASE);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.get('/exit', exit);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/movies'));

app.use('*', (req, res, next) => next(new NotFoundError(errorCodeUrlMessage404)));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
