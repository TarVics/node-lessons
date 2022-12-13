const {oauthService, emailService, userService, actionTokenService, oldPasswordService} = require("../service");
const {tokenAction, emailAction} = require("../enum");
const {FRONTEND_URL} = require("../config");

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body } = req;

            // console.log(emailAction.WELCOME, '- AUTH CONTROLLER');
            // await emailService.sendEmail('tarvics@outlook.com', emailAction.WELCOME, { userName: user.name });
            await emailService.sendEmail(user.email, emailAction.WELCOME,{
                userName: user.name,
                array: [{ number: 1}, { number: 2}, { number: 3}],
                condition: false
            });

            //await oauthService.comparePasswords(user.password, body.password);
            await user.comparePasswords(body.password);

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

    logout: async (req, res, next) => {
        try {
            const { accessToken } = req.tokenInfo;

            await oauthService.delete({ accessToken });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const { _user_id } = req.tokenInfo;

            await oauthService.deleteMany({ _user_id: _user_id._id });

            res.sendStatus(204);
        } catch (e) {
            next(e);
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
            const { _id, email, name } = req.user;

            const actionToken = oauthService.generateActionToken(tokenAction.FORGOT_PASS, {email});
            const forgotPasswordFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`;

            await actionTokenService.create({
                token: actionToken, tokenType: tokenAction.FORGOT_PASS, _user_id: _id });
            await emailService.sendEmail(email, emailAction.FORGOT_PASS, {url: forgotPasswordFEUrl, userName: name} );

            res.status(201);
        } catch (e) {
            next(e);
        }
    },

    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const { user, body } = req;

            const hashPassword = await oauthService.hashPassword(body.password);

            await oldPasswordService.create({ _user_id: user._id, password: user.password});
            await actionTokenService.delete(req.get('Authorization'));
            await userService.update(user._id, {password: hashPassword});

            res.status(200);
        } catch (e) {
            next(e);
        }
    }

}