const express = require('express');
const { doConversation } = require('../controllers/fortuneController');
const router = express.Router();

router.post('/', doConversation);


module.exports = router;