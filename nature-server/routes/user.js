const express = require('express');
const { login, logout, signup, upload } = require('../controllers/userController');
const router = express.Router();

router.post('/login', login);

router.post('/logout', logout);

router.post('/signup', signup);

router.post('/upload', upload);

module.exports = router;