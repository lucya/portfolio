const express = require('express');
const userRoutes = require('./user');
const movieRoutes = require('./movie');

const router = express.Router();

router.use('/user', userRoutes);

router.use('/movie', movieRoutes);

module.exports = router;

