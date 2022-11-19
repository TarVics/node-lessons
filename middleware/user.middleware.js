const { ApiError } = require('../error');
const { userDatabase } = require('../database');

module.exports = {
    checkExists: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const id = +userId;

            if (!Number.isInteger(id)) {
                next(new ApiError('User ID is omitted or is not number', 400));
                return;
            }

            const user = await userDatabase.read(id);
            if (!user) {
                next(new ApiError('User not found!', 404));
                return;
            }

            // console.log('USER', user);
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkBody: async (req, res, next) => {
        try {
            const user = req.body;

            if (!user) {
                next(new ApiError('User data is empty!', 400));
                return;
            }

            if (typeof user.name !== 'string' || !user.name.length) {
                next(new ApiError('User name is omitted or is not valid', 400));
                return;
            }

            if (typeof user.age !== 'number' || user.age < 0 || user.age > 200) {
                next(new ApiError('User age is omitted or is not valid', 400));
                return;
            }

            if (req.user) {
                Object.assign(req.user, user);
            } else {
                req.user = user;
            }

            // console.log('USER', req.user);

            next();
        } catch (e) {
            next(e);
        }
    }

}