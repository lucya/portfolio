const express = require('express');
const { getPopularMovies, getMovieInfo, getMovieVideos, getMovieReview } = require('../controllers/movieController');
const router = express.Router();

router.get('/popular-movies', getPopularMovies);

router.get('/:id', getMovieInfo);

router.get('/videos/:id', getMovieVideos);

router.post('/review', getMovieReview);

module.exports = router;