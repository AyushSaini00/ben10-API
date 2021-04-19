const express = require('express');
const router = express.Router();
const RandomAlienController = require('../controllers/randomAlien');

// baseURL/random
router.get('/', RandomAlienController.random_alien);

module.exports = router;