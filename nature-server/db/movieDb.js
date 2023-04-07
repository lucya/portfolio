const MOVIE_API_KEY = process.env.MOVIE_API_KEY
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(MOVIE_API_KEY)

module.exports = {
  MOVIE_API_KEY,
  moviedb
}