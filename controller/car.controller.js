const { Car } = require('../database');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            console.log('/cars [GET] endpoint')
            const cars = await Car.find({});
            res.json(cars);
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

            // const car2 = {
            //     year: car.year,
            //     make: car.make,
            //     model: car.model
            // }
            //
            // console.log(car2);
            const resCar = await Car.findOneAndUpdate(carId, car);

            res.json(resCar);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {carId} = req.params;

            console.log('/cars/' + carId + ' [DELETE] endpoint')
            await Car.deleteOne({ _id: carId });

            res.status(204).json('Ok');
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const {car} = req;
            console.log('/cars [POST] endpoint')
            const obj = await Car.create(car);

            res.status(201).json(obj);
        } catch (e) {
            next(e);
        }
    }
}