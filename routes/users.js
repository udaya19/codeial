const express = require('express');
const { route } = require('.');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('../config/passport-local-strategy');
const usersController = require('../controllers/user_controller');
router.get('/profile/:id',passport.checkAuthentication,usersController.profile)//middleware to check if the user is autheticated and controller will be passed to next function only if user is looge in
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
) ,usersController.createSession)
router.get('/sign-out',usersController.destroySession)
module.exports = router;