const errorCodeMessage400 = 'Переданы некорректные данные';
const errorCodeMessage401 = 'Неверный email или пароль';
const errorCodeMessage403 = 'Недостаточно прав';
const errorCodeUserMessage404 = 'Пользователь не найден';
const errorCodeMovieMessage404 = 'Фильм не найден';
const errorCodeUrlMessage404 = 'Страница не найдена';
const errorCodeMessage409 = 'Пользователь с таким email уже зарегистрирован';

const regexUrl = /https?:\/\/(www\.)?[a-zA-Z0-9-_~:?#[\]@!$&'()*+,;=]{1,}\.[a-zA-Z0-9.\-_~:/?#[\]@!$&'()*+,;=]{1,}/i;

module.exports = {
  errorCodeMessage400,
  errorCodeMessage401,
  errorCodeMessage403,
  errorCodeUserMessage404,
  errorCodeMovieMessage404,
  errorCodeUrlMessage404,
  errorCodeMessage409,
  regexUrl,
};
