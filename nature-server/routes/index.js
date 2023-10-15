const express = require('express');
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const fortuneRoutes = require('./fortune');

const router = express.Router();
const verify = require('../routes/verifyToken');


router.use('/api/user', userRoutes);

router.use('/api/movie', verify, movieRoutes);

router.use('/api/fortune', verify, fortuneRoutes);

module.exports = router;

