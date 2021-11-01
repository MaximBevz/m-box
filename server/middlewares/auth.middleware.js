const { constants } = require('../constants');
const { OAuth } = require('../dataBase')
const { ErrorHandler, errorMessages } = require('../errors');
const {oAuthTokenGenerator} = require('../helpers');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if(!token) {
                throw new ErrorHandler(401, errorMessages.USER_NOT_AUTHORIZED.message, errorMessages.USER_NOT_AUTHORIZED.code);
            }

            await oAuthTokenGenerator.verifyToken(token);

            const tokenIsValid =  await OAuth.findOne({accessToken: token});

            if(!tokenIsValid) {
                throw new ErrorHandler(401, errorMessages.WRONG_TOKEN.message, errorMessages.WRONG_TOKEN.code);
            }

            req.user = tokenIsValid;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if(!token) {
                throw new ErrorHandler(401, errorMessages.USER_NOT_AUTHORIZED.message, errorMessages.USER_NOT_AUTHORIZED.code);
            }

            await oAuthTokenGenerator.verifyToken(token, 'refresh');

            const tokenIsValid =  await OAuth.findOne({refreshToken: token});

            if(!tokenIsValid) {
                throw new ErrorHandler(401, errorMessages.WRONG_TOKEN.message, errorMessages.WRONG_TOKEN.code);
            }

            req.user = tokenIsValid;

            next();
        } catch (e) {
            next(e);
        }
    }
}