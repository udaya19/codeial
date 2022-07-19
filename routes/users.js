const express = require('express');
const { route } = require('.');
const router = express.Router();

const usersController = require('../controllers/user_controller');
router.get('/',usersController.profile)
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn)
module.exports = router;