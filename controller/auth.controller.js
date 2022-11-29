const {oauthService} = require("../service");

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body } = req;
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
    }
}