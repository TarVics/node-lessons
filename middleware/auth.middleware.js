const {authValidator} = require("../validator");
const {ApiError} = require("../error");
const {oauthService} = require("../service");
const {tokenTypeEnum} = require("../enum");

module.exports = {
    checkLogin: (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

            if(validate.error) {
                next(new ApiError(validate.error.message, 400));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                next(new ApiError('No token', 401));
                return;
            }

            oauthService.checkToken(accessToken);

            const tokenInfo = await oauthService.readOne({ accessToken });

            if (!tokenInfo) {
                next(new ApiError('Token not valid', 401));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                next(new ApiError('No token', 401));
                return;
            }

            oauthService.checkToken(refreshToken, tokenTypeEnum.refreshToken);

            const tokenInfo = await oauthService.readOne({ refreshToken });

            if (!tokenInfo) {
                next(new ApiError('Token not valid', 401));
                return;
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    }

}