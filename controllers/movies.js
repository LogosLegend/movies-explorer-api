const Movie = require('../models/movie');

const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');

const {

  deleteMessageCode200,
  messageCode400,
  messageCode403,
  movieMessageCode404,

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
        next(new BadRequest(messageCode400));
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
            .then(() => res.send({ message: deleteMessageCode200 }))
            .catch(next);
        } else {
          next(new Forbidden(messageCode403));
        }
      } else {
        next(new NotFoundError(movieMessageCode404));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(messageCode400));
      } else {
        next(err);
      }
    });
};
