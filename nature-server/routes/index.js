const express = require('express');
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const fortuneRoutes = require('./fortune');

const router = express.Router();

router.use('/api/user', userRoutes);

router.use('/api/movie', movieRoutes);

router.use('/api/fortune', fortuneRoutes);

module.exports = router;

