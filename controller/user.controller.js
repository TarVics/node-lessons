const { userDatabase } = require('../database');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            console.log('/users [GET] endpoint')
            res.json(await userDatabase.read());
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
            await userDatabase.update(user, +userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {userId} = req.params;

            console.log('/users/' + userId + ' [DELETE] endpoint')
            await userDatabase.delete(+userId);

            res.status(204).json();
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const {user} = req;
            console.log('/users [POST] endpoint')
            const obj = await userDatabase.create(user);

            res.status(201).json(obj);
        } catch (e) {
            next(e);
        }
    }
}