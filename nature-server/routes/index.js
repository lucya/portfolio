const express = require('express');
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const fortuneRoutes = require('./fortune');
const govRoutes = require('./gov');

const router = express.Router();

router.use('/user', userRoutes);

router.use('/movie', movieRoutes);

router.use('/fortune', fortuneRoutes);

router.use('/gov', govRoutes);

module.exports = router;

