const express = require('express');
const { getPopularMovies, getMovieInfo } = require('../controllers/movieController');
const router = express.Router();

router.get('/popular-movies', getPopularMovies);

router.get('/:id', getMovieInfo);

module.exports = router;