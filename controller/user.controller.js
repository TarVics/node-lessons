const { User } = require('../database');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            console.log('/users [GET] endpoint')
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getById: (req, res, next) => {
        try {
            const {userId} = req.params;
            console.log('/users/' + userId + ' [GET] endpoint')
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    putById: async (req, res, next) => {
        try {
            const {user} = req;
            const {userId} = req.params;

            console.log('/users/' + userId + ' [PUT] endpoint')
            console.log(user);

            const resUser = await User.findOneAndUpdate(userId, user);

            console.log(resUser);

            res.json(resUser);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {userId} = req.params;

            console.log('/users/' + userId + ' [DELETE] endpoint')
            await User.deleteOne({ _id: userId });

            res.status(204).json('Ok');
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const {user} = req;
            console.log('/users [POST] endpoint')
            const obj = await User.create(user);

            res.status(201).json(obj);
        } catch (e) {
            next(e);
        }
    }
}