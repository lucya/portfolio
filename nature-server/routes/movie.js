const express = require('express');
const { getPopularMovies, getMovieInfo, getMovieReview } = require('../controllers/movieController');
const router = express.Router();

router.get('/popular-movies', getPopularMovies);

router.get('/:id', getMovieInfo);

router.post('/review', getMovieReview);

module.exports = router;