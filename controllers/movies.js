const Movie = require('../models/movie');

const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');

const {

  errorCodeMessage400,
  errorCodeMessage403,
  errorCodeMovieMessage404,

} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(errorCodeMessage400));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { filmId } = req.params;

  Movie.findById(filmId)
    .then((movie) => {
      if (movie) {
        if (req.user._id === movie.owner._id.toString()) {
          Movie.findByIdAndRemove(filmId)
            .then(() => res.send({ message: 'Удаление выполнено' }))
            .catch(next);
        } else {
          next(new Forbidden(errorCodeMessage403));
        }
      } else {
        next(new NotFoundError(errorCodeMovieMessage404));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(errorCodeMessage400));
      } else {
        next(err);
      }
    });
};
