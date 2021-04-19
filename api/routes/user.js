const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

// baseURL/user/signup
router.post('/signup', UserController.user_signup);

// baseURL/user/login
router.post('/login', UserController.user_login);

// baseURL/user/userId
router.delete('/:userId', checkAuth, UserController.user_delete);

module.exports = router;