const { ApiError } = require('../error');
const { Car } = require('../database');

module.exports = {

    checkExists: async (req, res, next) => {
        try {
            const {carId} = req.params;

            const car = await Car.findById(carId);
            if (!car) {
                next(new ApiError('car not found!', 404));
                return;
            }

            Object.assign(car, req.body);
            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkNameUnique: async (req, res, next) => {
        try {
            const { name } = req.body;

            if (!name) {
                next(new ApiError('Car name is empty!', 400));
                return;
            }

            const car = await Car.findOne({ name });
            if (car) {
                next(new ApiError('Car with the same name already exists!', 409));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkBody: async (req, res, next) => {
        try {
            const car = req.body;

            if (!car) {
                next(new ApiError('car data is empty!', 400));
                return;
            }

            if (typeof car.name !== 'string' || !car.name.length) {
                next(new ApiError('car name is omitted or is not valid', 400));
                return;
            }

            if (typeof car.year !== 'number' || car.year < 1990 || car.year > 2022) {
                next(new ApiError('car year is omitted or is not valid', 400));
                return;
            }

            if (typeof car.make !== 'string' || !car.make.length) {
                next(new ApiError('car make is omitted or is not valid', 400));
                return;
            }

            if (typeof car.model !== 'string' || !car.model.length) {
                next(new ApiError('car model is omitted or is not valid', 400));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

}