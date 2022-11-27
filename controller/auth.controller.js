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
    }
}