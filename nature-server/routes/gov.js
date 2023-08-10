const express = require('express');
const { getTsunamiShelter1List } = require('../controllers/govController');
const router = express.Router();

router.get('/getTsunamiShelter1List', getTsunamiShelter1List);

module.exports = router;