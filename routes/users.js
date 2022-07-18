const express = require('express');
const { route } = require('.');
const router = express.Router();

const usersController = require('../controllers/user_controller');
router.get('/',usersController.profile)
module.exports = router;