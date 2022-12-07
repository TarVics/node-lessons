const {oauthService, emailService, userService, actionTokenService} = require("../service");
const {tokenAction, emailAction} = require("../enum");
const {FRONTEND_URL} = require("../config");

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body } = req;

            console.log(emailAction.WELCOME, '- AUTH CONTROLLER');
            await emailService.sendEmail('tarvics@outlook.com', emailAction.WELCOME, { userName: user.name });

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair = oauthService.generateTokenPair({id: user._id});

            await oauthService.create({...tokenPair, _user_id: user._id});

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e)
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { refreshToken, _user_id } = req.tokenInfo;

            await oauthService.delete({ refreshToken });

            const tokenPair = oauthService.generateTokenPair({ id: _user_id });

            await oauthService.create({ ...tokenPair, _user_id });

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const user = req.user;
            const actionToken = oauthService.generateActionToken(tokenAction.FORGOT_PASS, {email: user.email});
            const forgotPasswordFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`;

            await actionTokenService.create({
                token: actionToken, tokenType: tokenAction.FORGOT_PASS, _user_id: user._id });
            await emailService.sendEmail('victor.fzs10@gmail.com',
                emailAction.FORGOT_PASS, {url: forgotPasswordFEUrl} );

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const { user, body } = req;

            await actionTokenService.delete(req.get('Authorization'));
            const hashPassword = await oauthService.hashPassword(body.password);
            await userService.update(user._id, {password: hashPassword});

            res.status(200);
        } catch (e) {
            next(e);
        }
    }

}