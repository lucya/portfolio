const express = require('express');
const { login, logout, signup, upload, check } = require('../controllers/userController');
const router = express.Router();

router.post('/login', login);

router.post('/logout', logout);

router.post('/signup', signup);

router.post('/upload', upload);

router.get('/check', check)

module.exports = router;