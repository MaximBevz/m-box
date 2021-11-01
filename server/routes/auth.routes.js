const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware ,userMiddleware } = require('../middlewares');

router.post('/sign-in' ,authController.loginProfile);

router.post('/sign-up', userMiddleware.checkUserValidity, authController.createProfile);

router.post('/logout', authMiddleware.checkAccessToken, authController.logoutProfile);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.createNewToken);

module.exports = router;