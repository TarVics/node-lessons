const { ApiError } = require('../error');
const { carDatabase } = require('../database');

module.exports = {

    checkExists: async (req, res, next) => {
        try {
            const {carId} = req.params;
            const id = +carId;

            if (!Number.isInteger(id)) {
                next(new ApiError('car ID is omitted or is not number', 400));
                return;
            }

            const car = await carDatabase.read(id);
            if (!car) {
                next(new ApiError('car not found!', 404));
                return;
            }

            // console.log('car', car);
            req.car = car;

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

            if (req.car) {
                Object.assign(req.car, car);
            } else {
                req.car = car;
            }

            // console.log('car', req.car);

            next();
        } catch (e) {
            next(e);
        }
    }

}