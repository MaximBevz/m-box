const { userServices } = require('../services');
const { responseMessagesEnum } = require('../constants');

module.exports = {
    getUserFilms: async (req, res, next) => {
        try {
            const {id} = req.user;

            const filmsList = await userServices.getUserFilms(id);

            res.status(responseMessagesEnum.SUCCESS.code).json(filmsList);
        } catch (e) {
            next(e);
        }
    },

    deleteFilmById: async (req, res, next) => {
        try {
            await userServices.removeFilm(req.params);

            res.status(responseMessagesEnum.USER_DELETED.code).json(responseMessagesEnum.USER_DELETED.messages);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            await userServices.updateFilmById(req.params, req.body);

            res.status(responseMessagesEnum.USER_UPDATED.code).json(responseMessagesEnum.USER_UPDATED.messages);
        } catch (e) {
            next(e);
        }
    },

    addFilmInWishList: async (req, res, next) => {
        try {
            const updatedWishList = await userServices.addFilm(req.body, req.user);

            res.status(responseMessagesEnum.USER_UPDATED.code).json(updatedWishList);
        } catch (e) {
            next(e);
        }
    },
};