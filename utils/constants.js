const signInMessageCode200 = 'Вход выполнен';
const signOutMessageCode200 = 'Выход выполнен';
const deleteMessageCode200 = 'Удаление выполнено';
const messageCode400 = 'Переданы некорректные данные';
const failAuthMessageCode401 = 'Неверный email или пароль';
const notAuthMessageCode401 = 'Авторизируйтесь';
const messageCode403 = 'Недостаточно прав';
const userMessageCode404 = 'Пользователь с данным ID не найден';
const movieMessageCode404 = 'Фильм не найден';
const urlMessageCode404 = 'Страница не найдена';
const messageCode409 = 'Пользователь с таким email уже зарегистрирован';
const messageCode429 = 'Слишком много запросов';
const messageCode500 = 'На сервере произошла ошибка';

const devDataBase = 'mongodb://localhost:27017/bitfilmsdb';

const regexUrl = /https?:\/\/(www\.)?[a-zA-Z0-9-_~:?#[\]@!$&'()*+,;=]{1,}\.[a-zA-Z0-9.\-_~:/?#[\]@!$&'()*+,;=]{1,}/i;

module.exports = {
  signInMessageCode200,
  signOutMessageCode200,
  deleteMessageCode200,
  messageCode400,
  failAuthMessageCode401,
  notAuthMessageCode401,
  messageCode403,
  userMessageCode404,
  movieMessageCode404,
  urlMessageCode404,
  messageCode409,
  messageCode429,
  messageCode500,
  devDataBase,
  regexUrl,
};
