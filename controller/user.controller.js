const {userService, oauthService} = require("../service");

module.exports = {
    create: async (req, res, next) => {
        try {
            const hashPassword = await oauthService.hashPassword(req.body.password);

            const user = await userService.create({...req.body, password: hashPassword});

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    },

    readAll: async (req, res, next) => {
        try {
            const users = await userService.readAll();
            res.json(users);
        } catch (e) {
            next(e)
        }
    },

    readFromReq: async (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e)
        }
    },

    update: async (req, res, next) => {
        try {
            const userInfo = req.body;
            const {userId} = req.params;

            const user = await userService.update(userId, userInfo);

            res.json(user);
        } catch (e) {
            next(e)
        }
    },

    delete: async (req, res, next) => {
        try {
            const {userId} = req.params;
            await userService.delete(userId);

            res.status(204).send('done');
        } catch (e) {
            next(e)
        }
    }
}