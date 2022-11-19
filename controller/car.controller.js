const { carDatabase } = require('../database');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            console.log('/cars [GET] endpoint')
            res.json(await carDatabase.read());
        } catch (e) {
            next(e);
        }
    },

    getById: (req, res, next) => {
        try {
            const {carId} = req.params;
            console.log('/cars/' + carId + ' [GET] endpoint')
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    putById: async (req, res, next) => {
        try {
            const {car} = req;
            const {carId} = req.params;

            console.log('/cars/' + carId + ' [PUT] endpoint')
            await carDatabase.update(car, +carId);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {carId} = req.params;

            console.log('/cars/' + carId + ' [DELETE] endpoint')
            await carDatabase.delete(+carId);

            res.status(204).json();
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const {car} = req;
            console.log('/cars [POST] endpoint')
            const obj = await carDatabase.create(car);

            res.status(201).json(obj);
        } catch (e) {
            next(e);
        }
    }
}