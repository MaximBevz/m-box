const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.get('/:userId', userMiddleware.checkIsUserPresent, userController.getUserFilms);

router.post('/:userId', authMiddleware.checkAccessToken, userMiddleware.checkIsUserPresent, userController.addFilmInWishList);

router.delete('/:userId/films/:filmId', authMiddleware.checkAccessToken, userMiddleware.checkIsUserPresent, userController.deleteFilmById);

router.put('/:userId/films/:filmId', authMiddleware.checkAccessToken, userMiddleware.checkIsUserPresent, userController.updateUserById);

module.exports = router;