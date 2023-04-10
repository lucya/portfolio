const express = require('express');
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const fortuneRoutes = require('./fortune');

const router = express.Router();

router.use('/user', userRoutes);

router.use('/movie', movieRoutes);

router.use('/fortune', fortuneRoutes);

module.exports = router;

