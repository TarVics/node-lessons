const {authValidator} = require("../validator");
const {ApiError} = require("../error");
const {oauthService, emailService, actionTokenService} = require("../service");
const {tokenType, emailAction, tokenAction} = require("../enum");

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
            console.log(emailAction.FORGOT_PASS, '- AUTH CONTROLLER');
            await emailService.sendEmail('tarvics@outlook.com', emailAction.FORGOT_PASS);

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

            oauthService.checkToken(refreshToken, tokenType.refreshToken);

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
    },

    checkActionToken: async (req, res, next) => {
        try {
            const actionToken = req.get('Authorization');

            if (!actionToken) {
                next(new ApiError('No token', 401));
                return;
            }

            oauthService.checkActionToken(actionToken, tokenAction.FORGOT_PASS);

            const tokenInfo = await actionTokenService
                .readOne({ token: actionToken, tokenType: tokenAction.FORGOT_PASS })
                .populate('_user_id');

            if (!tokenInfo) {
                next(new ApiError('Token not valid', 401));
                return;
            }

            req.user = tokenInfo._user_id;

            next();
        } catch (e) {
            next(e);
        }
    }

}